import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import CommentsList from './Comments';
import sleep from '../helpers/sleep';

const addComment = (id, userName, comment) => {
  const url = 'http://localhost:9001/comments';
  const date = new Date();
  const time = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');

  fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: id,
      parent_id: null,
      user: userName,
      date: time,
      content: comment,
    }),
  });
};
const postURL = 'http://localhost:9001/posts/';

class PostElement extends React.Component {
  constructor() {
    super();
    this.state = {
      postLoaded: false,
      commentsLoaded: false,
      postError: false,
      commentsError: false,
      content: {},
      comments: [],
      commentUserName: '',
      commentContent: '',
      deletingComment: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  fetchComments(id) {
    fetch(`${postURL}${id}/comments`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ comments: json, commentsLoaded: true });
      })
      .catch((err) => {
        this.setState({ commentsError: true });
        console.log(err);
      });
  }

  fetchPost(id) {
    fetch(`${postURL}${id}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ content: json, postLoaded: true });
      })
      .catch((err) => {
        this.setState({ postError: true });
        console.log(err);
      });
  }

  deleteComment(e, id, index) {
    e.preventDefault();

    const url = `http://localhost:9001/comments/${id}`;

    // remove the comment from the dom directly for a better user experience
    this.state.comments.splice(index, 1);

    // remove the comment from the db
    fetch(url, {
      method: 'delete',
    });

    this.setState({
      deletingComment: true,
    });
  }

  handleChange(e) {
    const { target } = e;
    const { name } = target;

    this.setState({ [name]: target.value });
  }

  handleSubmit(e, id) {
    e.preventDefault();

    const { commentUserName, commentContent } = this.state;

    addComment(id, commentUserName, commentContent);

    this.setState({
      commentsLoaded: false,
      commentUserName: '',
      commentContent: '',
    });
  }

  componentDidMount() {
    // load the post and its comments
    this.fetchPost(this.props.id);
    this.fetchComments(this.props.id);
  }

  componentDidUpdate() {
    const reloadComments = async () => {
      await sleep(300);
      this.fetchComments(this.props.id);
    };
    // reload the comments after adding one
    if (this.state.commentsLoaded === false) {
      reloadComments();
    }
  }

  render() {
    const {
      title, content, author, publishDate, id,
    } = this.state.content;
    return (
      <div className="post">
        {!this.state.postLoaded && !this.state.postError && <p>Loading the post...</p>}
        {this.state.postError && <p>Error during loading the post...</p>}
        {this.state.postLoaded && (
          <div>
            <section className="post mb-2">
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <i>
                {author} - {publishDate}
              </i>
            </section>
            {!this.state.commentsLoaded && !this.state.commentsError && <p>Loading comments...</p>}
            {this.state.commentsError && <p>Error during loading the comments...</p>}
            {this.state.commentsLoaded && (
              <div>
                {this.state.comments.length > 0 && (
                  <section className="comments mb-2">
                    <CommentsList
                      comments={this.state.comments}
                      action={this.deleteComment}
                    />
                  </section>
                )}
                <hr />
                <section className="addComment mb-2">
                  <h4>Add a comment:</h4>
                  <form onSubmit={e => this.handleSubmit(e, id)}>
                    <input
                      name="commentUserName"
                      className="form-control"
                      type="text"
                      value={this.state.commentUserName}
                      onChange={this.handleChange}
                      placeholder="Enter your user name"
                      required
                    />
                    <textarea
                      name="commentContent"
                      className="form-control"
                      type="text"
                      value={this.state.commentContent}
                      onChange={this.handleChange}
                      placeholder="Enter your comment here"
                      required
                    />
                    <input
                      type="submit"
                      value="Add a comment"
                      className="btn btn-primary"
                    />
                  </form>
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

PostElement.propTypes = {
  id: PropTypes.number,
};

export default PostElement;

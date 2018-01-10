import React from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import CommentsList from './Comments';

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

class PostElement extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      error: false,
      content: {},
      comments: [],
      commentUserName: '',
      commentContent: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  fetchComments(id) {
    fetch(`http://localhost:9001/posts/${id}/?_embed=comments`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ content: json, comments: json.comments, loaded: true });
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err);
      });
  }

  deleteComment(e, id) {
    e.preventDefault();

    const url = `http://localhost:9001/comments/${id}`;

    fetch(url, {
      method: 'delete',
    });

    this.setState({
      loaded: false,
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
      loaded: false,
      commentUserName: '',
      commentContent: '',
    });
  }

  componentDidMount() {
    // load the post and its comments
    this.fetchComments(this.props.id);
  }

  componentDidUpdate() {
    // reload the post and its comments after adding or deleting one
    if (this.state.loaded === false) {
      setTimeout(() => {
        this.fetchComments(this.props.id);
      }, 300);
    }
  }

  render() {
    const {
      title, content, author, publishDate, id,
    } = this.state.content;
    return (
      <div className="post">
        {!this.state.loaded && !this.state.error && <p>Loading...</p>}
        {this.state.error && <p>Error...</p>}
        {this.state.loaded && (
          <div>
            <section className="post mb-2">
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }}/>
              <i>
                {author} - {publishDate}
              </i>
            </section>
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
    );
  }
}

PostElement.propTypes = {
  id: PropTypes.number,
};

export default PostElement;

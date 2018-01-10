import React from 'react';
import PropTypes from 'prop-types';
import PostElement from './PostElement.jsx';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      postId: '',
    };
  }

  componentWillMount() {
    this.setState({ postId: this.props.postId });
  }

  render() {
    return (
      <div>
        <PostElement id={this.state.postId} />
      </div>
    );
  }
}

Post.propTypes = {
  postId: PropTypes.number,
};

export default Post;

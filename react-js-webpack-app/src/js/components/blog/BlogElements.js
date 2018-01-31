import React from 'react';
import PropTypes from 'prop-types';

const Post = ({
  title, author, publishDate, description, id,
}) => (
  <li className="list-group-item text-center">
    <b>{title}</b> by {author}: {description} <i>{publishDate} </i>
    <br />
    <a className="btn btn-primary mt-3" href={`#/post/${id}`}>
      Read more
    </a>
  </li>
);

const PostsList = props => (
  <div>
    <h3>Posts List ({props.number})</h3>
    <ul className="list-group">
      {props.posts.map((post, index) => <Post key={index} {...post} />)}
    </ul>
  </div>
);

Post.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishDate: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
};

PostsList.propTypes = {
  posts: PropTypes.array,
  number: PropTypes.number,
};

export default PostsList;

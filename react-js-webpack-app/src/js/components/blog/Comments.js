import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({
  content, date, user, id, action, index,
}) => (
  <li className="list-group-item">
    {content} by {user} -
    <i> {date}</i>
    <button
      title='Delete this comment'
      onClick={e => action(e, id, index)}
      type="submit"
      className="btn btn-primary float-right m-2">
      X
    </button>
  </li>
);

const CommentsList = props => (
  <div>
    <hr />
    <h4>Comment(s)</h4>
    <ul className="list-group">
      {props.comments.map((comment, index) => (
        <Comment
          key={index}
          {...comment}
          action={props.action}
          index={index}
        />
      ))}
    </ul>
  </div>
);

Comment.propTypes = {
  content: PropTypes.string,
  user: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
  action: PropTypes.func,
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  action: PropTypes.func,
};

export default CommentsList;

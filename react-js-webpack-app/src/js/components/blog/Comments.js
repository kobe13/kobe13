import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({
  content, date, user, id, action,
}) => (
  <li className="list-group-item">
    {content} by {user} -
    <i> {date}</i>
    <button onClick={e => action(e, id)} type="submit" className="btn btn-primary float-right">
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
  action: PropTypes.func,
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  action: PropTypes.func,
};

export default CommentsList;

import React from 'react';
import PropTypes from 'prop-types';

const User = ({ login, avatar_url }) => (
  <li className="list-group-item text-left">
    <div className="media">
      <img className="mr-3" src={avatar_url} width="64" height="64" />
      <div className="media-body mb-2 mt-2">
        <h5 className="mt-0">{login}</h5>
      </div>
      <a href={`#/user/${login}`} className="btn btn-info">
        See details
      </a>
    </div>
  </li>
);

const UsersList = props => (
  <div className="row">
    <div className="col-12 col-md-6">
      <ul className="list-group">
        {props.users
          .slice(0, props.usersNumber / 2)
          .map(user => <User key={user.id} {...user} />)}
      </ul>
    </div>
    <div className="col-12 col-md-6">
      <ul className="list-group">
        {props.users
          .slice(props.usersNumber / 2, props.usersNumber)
          .map(user => <User key={user.id} {...user} />)}
      </ul>
    </div>
  </div>
);

User.propTypes = {
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  usersNumber: PropTypes.number.isRequired,
};

export default UsersList;

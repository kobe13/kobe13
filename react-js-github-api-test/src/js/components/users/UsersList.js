// @flow
import React from 'react';

type UserProps = {
  login: string,
  avatar_url: string,
  id: string,
};

type UsersListProps = {
  users: UserProps[],
};

const User = ({ login, avatar_url }: UserProps) => (
  <div className="list-group-item text-left col-12 col-md-6">
    <div className="media">
      <img
        alt={`${login} avatar`}
        className="mr-3"
        src={avatar_url}
        width="64"
        height="64"
      />
      <div className="media-body mb-2 mt-2">
        <h5 className="mt-0 mr-2">{login}</h5>
      </div>
      <a href={`#/user/${login}`} className="btn btn-info">
        See details
      </a>
    </div>
  </div>
);

const UsersList = (props: UsersListProps) => (
  <div className="container">
    <div className="row">
      {props.users.map(user => <User key={user.id} {...user} />)}
    </div>
  </div>
);

export default UsersList;

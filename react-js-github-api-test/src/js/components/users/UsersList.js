// @flow
import React from 'react';

type UserProps = {
  login: string,
  avatar_url: string,
  id: string,
};

type UsersListProps = {
  users: UserProps[],
  usersNumber: number,
};

const User = ({ login, avatar_url }: UserProps) => (
  <li className="list-group-item text-left">
    <div className="media">
      <img
        alt={`${login} avatar`}
        className="mr-3"
        src={avatar_url}
        width="64"
        height="64"
      />
      <div className="media-body mb-2 mt-2">
        <h5 className="mt-0">{login}</h5>
      </div>
      <a href={`#/user/${login}`} className="btn btn-info">
        See details
      </a>
    </div>
  </li>
);

const UsersList = (props: UsersListProps) => (
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

export default UsersList;

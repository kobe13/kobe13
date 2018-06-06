import * as React from 'react';
import renderer from 'react-test-renderer';
import UsersList from './UsersList';

test('Users list renders correctly with 2 users', () => {
  const gitHubUsers = [
    {
      login: 'login',
      avatar_url: 'avatar_url',
      key: 1,
    },
    {
      login: 'login2',
      avatar_url: 'avatar_url2',
      key: 2,
    },
  ];
  const component = renderer.create(
    <UsersList users={gitHubUsers} usersNumber={gitHubUsers.length} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

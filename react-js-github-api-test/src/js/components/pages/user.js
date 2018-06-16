// @flow
import * as React from 'react';
import PageTemplate from '../common/pageTemplate';
import User from '../user/User';

const UserDetailPage = ({ match }: string) => (
  <PageTemplate>
    <User userLogin={match.params.login} />
  </PageTemplate>
);

export default UserDetailPage;

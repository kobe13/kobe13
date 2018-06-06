import * as React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from '../common/pageTemplate';
import User from '../user/User';

const UserDetailPage = ({ match }) => (
  <PageTemplate>
    <User userLogin={match.params.login} />
  </PageTemplate>
);

UserDetailPage.propTypes = {
  match: PropTypes.number.isRequired,
};

export default UserDetailPage;

import { createSelector } from 'reselect';

const getCurrentUser = (state, props) =>
  state.usersData.gitHubUsers.find(user => user.login === props.userLogin);

const makeGetCurrentUserState = () =>
  createSelector(getCurrentUser, currentUser => ({ currentUser }));

export default makeGetCurrentUserState;

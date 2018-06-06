import { createSelector } from 'reselect';

const getBar = (state, props) =>
  state.currentUserData.gitHubUser.find(b => b.userLogin === props.userLogin);
const makeGetBarState = () =>
  createSelector(getBar, gitHubUser => ({ gitHubUser }));

export default makeGetBarState;

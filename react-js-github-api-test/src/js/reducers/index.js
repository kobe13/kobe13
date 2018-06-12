import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {
  projects,
  projectsHasErrored,
  projectsIsLoading,
  projectsNumber,
  contributorsHasErrored,
  contributorsIsLoading,
  projectInfo,
  projectContributors,
} from './projects';
import orgName from './org';
import {
  gitHubUsers,
  usersHasErrored,
  usersIsLoading,
  usersNumber,
} from './users';
import {
  gitHubUser,
  currentUserHasErrored,
  currentUserIsLoading,
} from './user';

const contributors = combineReducers({
  projectContributors,
  contributorsHasErrored,
  contributorsIsLoading,
});

const usersData = combineReducers({
  gitHubUsers,
  usersHasErrored,
  usersIsLoading,
  usersNumber,
});

export const currentUserData = combineReducers({
  gitHubUser,
  currentUserHasErrored,
  currentUserIsLoading,
});

const project = combineReducers({
  projectInfo,
  contributors,
});

const projectsData = combineReducers({
  projects,
  projectsHasErrored,
  projectsIsLoading,
  projectsNumber,
  project,
});

const orgData = combineReducers({
  orgName,
});

export default combineReducers({
  projectsData,
  orgData,
  usersData,
  currentUserData,
  loadingBar: loadingBarReducer,
});

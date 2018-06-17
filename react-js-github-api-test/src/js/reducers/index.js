// @flow
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import * as Projects from './projects';
import * as Org from './org';
import * as Users from './users';
import * as CurrentUser from './user';

export type State = {
  Projects: {
    projects: Projects.State.projects,
    projectsHasErrored: Projects.State.projectsHasErrored,
    projectsIsLoading: Projects.State.projectsIsLoading,
    projectsNumber: Projects.State.projectsNumber,
    contributorsHasErrored: Projects.State.contributorsHasErrored,
    contributorsIsLoading: Projects.State.contributorsIsLoading,
    projectInfo: Projects.State.projectInfo,
    projectContributors: Projects.State.projectContributors,
  },
  Users: {
    gitHubUsers: Users.State.gitHubUsers,
    usersHasErrored: Users.State.usersHasErrored,
    usersIsLoading: Users.State.usersIsLoading,
    usersNumber: Users.State.usersNumber,
  },
  CurrentUser: {
    gitHubUser: CurrentUser.State.gitHubUser,
    currentUserHasErrored: CurrentUser.State.currentUserHasErrored,
    currentUserIsLoading: CurrentUser.State.currentUserIsLoading,
  },
  Org: {
    orgName: Org.State.orgName,
  },
};

export const initState = (): State => ({
  Projects: {
    projects: Projects.initialState.projects,
    projectsHasErrored: Projects.initialState.projectsHasErrored,
    projectsIsLoading: Projects.initialState.projectsIsLoading,
    projectsNumber: Projects.initialState.projectsNumber,
    contributorsHasErrored: Projects.initialState.contributorsHasErrored,
    contributorsIsLoading: Projects.initialState.contributorsIsLoading,
    projectInfo: Projects.initialState.projectInfo,
    projectContributors: Projects.initialState.projectContributors,
  },
  Users: {
    gitHubUsers: Users.initialState.gitHubUsers,
    usersHasErrored: Users.initialState.usersHasErrored,
    usersIsLoading: Users.initialState.usersIsLoading,
    usersNumber: Users.initialState.usersNumber,
  },
  CurrentUser: {
    gitHubUser: CurrentUser.initialState.gitHubUser,
    currentUserHasErrored: CurrentUser.initialState.currentUserHasErrored,
    currentUserIsLoading: CurrentUser.initialState.currentUserIsLoading,
  },
  Org: {
    orgName: Org.initialState.orgName,
  },
});

const contributors = combineReducers({
  projectContributors: Projects.projectContributorsReducer,
  contributorsHasErrored: Projects.contributorsHasErroredReducer,
  contributorsIsLoading: Projects.contributorsIsLoadingReducer,
});

const usersData = combineReducers({
  gitHubUsers: Users.gitHubUsersReducer,
  usersHasErrored: Users.usersHasErroredReducer,
  usersIsLoading: Users.usersIsLoadingReducer,
  usersNumber: Users.usersNumberReducer,
});

const currentUserData = combineReducers({
  gitHubUser: CurrentUser.gitHubUserReducer,
  currentUserHasErrored: CurrentUser.currentUserHasErroredReducer,
  currentUserIsLoading: CurrentUser.currentUserIsLoadingReducer,
});

const project = combineReducers({
  projectInfo: Projects.projectInfoReducer,
  contributors,
});

const projectsData = combineReducers({
  projects: Projects.projectsReducer,
  projectsHasErrored: Projects.projectsHasErroredReducer,
  projectsIsLoading: Projects.projectsIsLoadingReducer,
  projectsNumber: Projects.projectsNumberReducer,
  project,
});

const orgData = combineReducers({
  orgName: Org.orgNameReducer,
});

export default combineReducers({
  projectsData,
  orgData,
  usersData,
  currentUserData,
  loadingBar: loadingBarReducer,
});

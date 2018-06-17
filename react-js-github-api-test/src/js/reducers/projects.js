// @flow
import type { Action } from '../actions/projects';

export type State = {
  projectsHasErrored: boolean,
  projectsIsLoading: boolean,
  projectsNumber: string | null,
  projects: [] | null,
  contributorsHasErrored: boolean,
  contributorsIsLoading: boolean,
  projectInfo: [] | null,
  projectContributors: [] | null,
};

export const initialState: State = {
  projectsHasErrored: false,
  projectsIsLoading: false,
  projectsNumber: null,
  projects: null,
  contributorsHasErrored: false,
  contributorsIsLoading: false,
  projectInfo: null,
  projectContributors: null,
};

export const projectsHasErroredReducer = (
  state: State.projectsHasErrored = initialState.projectsHasErrored,
  action: Action
) => {
  switch (action.type) {
    case 'PROJECTS_HAS_ERRORED':
      return action.projectsHasErrored;
    default:
      return state;
  }
};

export const projectsIsLoadingReducer = (
  state: State.projectsIsLoading = initialState.projectsIsLoading,
  action: Action
) => {
  switch (action.type) {
    case 'PROJECTS_IS_LOADING':
      return action.projectsIsLoading;
    default:
      return state;
  }
};

export const projectsNumberReducer = (
  state: State.projectsNumber = initialState.projectsNumber,
  action: Action
) => {
  switch (action.type) {
    case 'PROJECTS_NUMBER':
      return action.projectsNumber;
    default:
      return state;
  }
};

export const projectsReducer = (
  state: State.projects = initialState.projects,
  action: Action
) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_DATA_SUCCESS':
      return action.projects;
    default:
      return state;
  }
};

export const contributorsHasErroredReducer = (
  state: State.contributorsHasErrored = initialState.contributorsHasErrored,
  action: Action
) => {
  switch (action.type) {
    case 'CONTRIBUTORS_HAS_ERRORED':
      return action.contributorsHasErrored;
    default:
      return state;
  }
};

export const contributorsIsLoadingReducer = (
  state: State.contributorsIsLoading = initialState.contributorsIsLoading,
  action: Action
) => {
  switch (action.type) {
    case 'CONTRIBUTORS_IS_LOADING':
      return action.contributorsIsLoading;
    default:
      return state;
  }
};

export const projectContributorsReducer = (
  state: State.projectContributors = initialState.projectContributors,
  action: Action
) => {
  switch (action.type) {
    case 'CONTRIBUTORS_FETCH_DATA_SUCCESS':
      return action.contributors;
    default:
      return state;
  }
};

export const projectInfoReducer = (
  state: State.projectInfo = initialState.projectInfo,
  action: Action
) => {
  switch (action.type) {
    case 'PROJECT_INFO_FETCH_DATA_SUCCESS':
      return action.projectInfo;
    default:
      return state;
  }
};

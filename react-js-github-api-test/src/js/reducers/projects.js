// @flow
import type { Action } from '../actions/projects';
import State from './index';

export const projectsHasErrored = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'PROJECTS_HAS_ERRORED':
      return action.projectsHasErrored;
    default:
      return state;
  }
};

export const projectsIsLoading = (state: State = false, action: Action) => {
  switch (action.type) {
    case 'PROJECTS_IS_LOADING':
      return action.projectsIsLoading;
    default:
      return state;
  }
};

export const projectsNumber = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'PROJECTS_NUMBER':
      return action.projectsNumber;
    default:
      return state;
  }
};

export const projects = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_DATA_SUCCESS':
      return action.projects;
    default:
      return state;
  }
};

export const contributorsHasErrored = (
  state: State = false,
  action: Action
) => {
  switch (action.type) {
    case 'CONTRIBUTORS_HAS_ERRORED':
      return action.contributorsHasErrored;
    default:
      return state;
  }
};

export const contributorsIsLoading = (state: State = false, action: Action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_IS_LOADING':
      return action.contributorsIsLoading;
    default:
      return state;
  }
};

export const projectContributors = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_FETCH_DATA_SUCCESS':
      return action.contributors;
    default:
      return state;
  }
};

export const projectInfo = (state: State = null, action: Action) => {
  switch (action.type) {
    case 'PROJECT_INFO_FETCH_DATA_SUCCESS':
      return action.projectInfo;
    default:
      return state;
  }
};

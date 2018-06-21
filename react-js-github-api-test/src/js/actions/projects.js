// @flow
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import type { ThunkAction } from './index';

type projectsHasErroredAction = {
  type: 'PROJECTS_HAS_ERRORED',
  projectsHasErrored: boolean,
};
export const projectsHasErrored = (
  boolean: boolean
): projectsHasErroredAction => ({
  type: 'PROJECTS_HAS_ERRORED',
  projectsHasErrored: boolean,
});

type projectsIsLoadingAction = {
  type: 'PROJECTS_IS_LOADING',
  projectsIsLoading: boolean,
};
export const projectsIsLoading = (
  boolean: boolean
): projectsIsLoadingAction => ({
  type: 'PROJECTS_IS_LOADING',
  projectsIsLoading: boolean,
});

type projectsNumberAction = {
  type: 'PROJECTS_NUMBER',
  projectsNumber: number | null,
};
export const projectsNumber = (
  number: number | null
): projectsNumberAction => ({
  type: 'PROJECTS_NUMBER',
  projectsNumber: number,
});

type projectsDataAction = {
  type: 'PROJECTS_FETCH_DATA_SUCCESS',
  projects: [] | null,
};
export const projectsData = (projects: [] | null): projectsDataAction => ({
  type: 'PROJECTS_FETCH_DATA_SUCCESS',
  projects,
});

type projectDetailAction = {
  type: 'PROJECT_INFO_FETCH_DATA_SUCCESS',
  projectInfo: [] | null,
};
export const projectDetail = (projectInfo: [] | null): projectDetailAction => ({
  type: 'PROJECT_INFO_FETCH_DATA_SUCCESS',
  projectInfo,
});

type projectContributorsAction = {
  type: 'CONTRIBUTORS_FETCH_DATA_SUCCESS',
  contributors: [] | null,
};
export const projectContributors = (
  contributors: [] | null
): projectContributorsAction => ({
  type: 'CONTRIBUTORS_FETCH_DATA_SUCCESS',
  contributors,
});

type contributorsHasErroredAction = {
  type: 'CONTRIBUTORS_HAS_ERRORED',
  contributorsHasErrored: boolean,
};
export const contributorsHasErrored = (boolean: boolean) => ({
  type: 'CONTRIBUTORS_HAS_ERRORED',
  contributorsHasErrored: boolean,
});

type contributorsIsLoadingAction = {
  type: 'CONTRIBUTORS_IS_LOADING',
  contributorsIsLoading: boolean,
};
export const contributorsIsLoading = (boolean: boolean) => ({
  type: 'CONTRIBUTORS_IS_LOADING',
  contributorsIsLoading: boolean,
});

export type ProjectsAction =
  | projectsHasErroredAction
  | projectsIsLoadingAction
  | projectsDataAction
  | projectsNumberAction
  | contributorsHasErroredAction
  | contributorsIsLoadingAction
  | projectContributorsAction
  | projectDetailAction;

// get all projects of an organisation
export const fetchProjects = (org: string): ThunkAction => dispatch => {
  dispatch(projectsHasErrored(false));
  dispatch(projectsIsLoading(true));
  dispatch(showLoading('orgSearchBar'));

  fetch(`https://api.github.com/orgs/${org}/repos`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(hideLoading('orgSearchBar'));
      return response;
    })
    .then(response => response.json())
    .then(projects => {
      dispatch(projectsIsLoading(false));
      dispatch(projectsData(projects.sort((a, b) => b.watchers - a.watchers)));
      dispatch(projectsNumber(projects.length));
    })
    .catch(() => {
      dispatch(projectsHasErrored(true));
      dispatch(projectsIsLoading(false));
      dispatch(hideLoading('orgSearchBar'));
    });
};

// get all contributors of a project
export const fetchProjectContributors = (
  url: string
): ThunkAction => dispatch => {
  dispatch(contributorsHasErrored(false));
  dispatch(contributorsIsLoading(true));
  dispatch(showLoading('contributorsBar'));

  fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(hideLoading('contributorsBar'));
      return response;
    })
    .then(res => res.json())
    .then(contributors => {
      dispatch(contributorsIsLoading(false));
      dispatch(projectContributors(contributors));
    })
    .catch(() => {
      dispatch(contributorsHasErrored(true));
      dispatch(hideLoading('contributorsBar'));
      dispatch(contributorsIsLoading(false));
    });
};

export const projectsCleanUp = (): ThunkAction => dispatch => {
  dispatch(projectsHasErrored(false));
  dispatch(projectsData(null));
  dispatch(projectContributors(null));
  dispatch(projectDetail(null));
  dispatch(projectsNumber(null));
};

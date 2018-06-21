// @flow
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import type { ThunkAction } from './index';

type currentUserHasErroredAction = {
  type: 'CURRENT_USER_HAS_ERRORED',
  currentUserHasErrored: boolean,
};
const currentUserHasErrored = (
  boolean: boolean
): currentUserHasErroredAction => ({
  type: 'CURRENT_USER_HAS_ERRORED',
  currentUserHasErrored: boolean,
});

type currentUserIsLoadingAction = {
  type: 'CURRENT_USER_IS_LOADING',
  currentUserIsLoading: boolean,
};
const currentUserIsLoading = (
  boolean: boolean
): currentUserIsLoadingAction => ({
  type: 'CURRENT_USER_IS_LOADING',
  currentUserIsLoading: boolean,
});

type currentUserDataAction = {
  type: 'CURRENT_USER_FETCH_DATA_SUCCESS',
  gitHubUser: [] | null,
};
export const currentUserData = (
  gitHubUser: [] | null
): currentUserDataAction => ({
  type: 'CURRENT_USER_FETCH_DATA_SUCCESS',
  gitHubUser,
});

export type UserAction =
  | currentUserHasErroredAction
  | currentUserIsLoadingAction
  | currentUserDataAction;

// get GitHub Users
export const fetchUserDetail = (userLogin: string): ThunkAction => dispatch => {
  dispatch(currentUserHasErrored(false));
  dispatch(currentUserIsLoading(true));
  dispatch(showLoading());

  fetch(`https://api.github.com/users/${userLogin}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(currentUserIsLoading(false));
      return response;
    })
    .then(response => response.json())
    .then(user => {
      dispatch(hideLoading());
      dispatch(currentUserData(user));
    })
    .catch(() => {
      dispatch(currentUserHasErrored(true));
      dispatch(currentUserIsLoading(false));
      dispatch(hideLoading());
    });
};

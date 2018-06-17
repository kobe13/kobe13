// @flow
import type { Action } from '../actions/user';

export type State = {
  currentUserHasErrored: boolean,
  currentUserIsLoading: boolean,
  gitHubUser: [] | null,
};

export const initialState: State = {
  currentUserHasErrored: false,
  currentUserIsLoading: false,
  gitHubUser: [],
};

export const currentUserHasErroredReducer = (
  state: State.currentUserHasErrored = initialState.currentUserHasErrored,
  action: Action
) => {
  switch (action.type) {
    case 'CURRENT_USER_HAS_ERRORED':
      return action.currentUserHasErrored;
    default:
      return state;
  }
};

export const currentUserIsLoadingReducer = (
  state: State.currentUserIsLoading = initialState.currentUserIsLoading,
  action: Action
) => {
  switch (action.type) {
    case 'CURRENT_USER_IS_LOADING':
      return action.currentUserIsLoading;
    default:
      return state;
  }
};

export const gitHubUserReducer = (
  state: State.gitHubUser = initialState.gitHubUser,
  action: Action
) => {
  switch (action.type) {
    case 'CURRENT_USER_FETCH_DATA_SUCCESS':
      return action.gitHubUser;
    default:
      return state;
  }
};

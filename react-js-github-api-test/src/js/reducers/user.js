// @flow
import type { Action } from '../actions/user';
import State from './index';

export const currentUserHasErrored = (state: State = false, action: Action) => {
  switch (action.type) {
    case 'CURRENT_USER_HAS_ERRORED':
      return action.currentUserHasErrored;
    default:
      return state;
  }
};

export const currentUserIsLoading = (state: State = false, action: Action) => {
  switch (action.type) {
    case 'CURRENT_USER_IS_LOADING':
      return action.currentUserIsLoading;
    default:
      return state;
  }
};

export const gitHubUser = (state: State = [], action: Action) => {
  switch (action.type) {
    case 'CURRENT_USER_FETCH_DATA_SUCCESS':
      return action.gitHubUser;
    default:
      return state;
  }
};

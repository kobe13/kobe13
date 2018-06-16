// @flow
import type { UsersAction } from '../actions/users';
import State from './index';

export const usersHasErrored = (state: State = false, action: UsersAction) => {
  switch (action.type) {
    case 'USERS_HAS_ERRORED':
      return action.usersHasErrored;
    default:
      return state;
  }
};

export const usersIsLoading = (state: State = false, action: UsersAction) => {
  switch (action.type) {
    case 'USERS_IS_LOADING':
      return action.usersIsLoading;
    default:
      return state;
  }
};

export const gitHubUsers = (state: State = [], action: UsersAction) => {
  switch (action.type) {
    case 'USERS_FETCH_DATA_SUCCESS':
      return action.gitHubUsers;
    case 'MORE_USERS_FETCH_DATA_SUCCESS':
      return [...state, ...action.moreUsers];
    default:
      return state;
  }
};

export const usersNumber = (state: State = null, action: UsersAction) => {
  switch (action.type) {
    case 'USERS_NUMBER':
      return action.usersNumber;
    default:
      return state;
  }
};

// @flow
import type { UsersAction } from '../actions/users';

export type State = {
  usersHasErrored: boolean,
  usersIsLoading: boolean,
  gitHubUsers: [] | null,
  usersNumber: string | null,
};

export const initialState: State = {
  usersHasErrored: false,
  usersIsLoading: false,
  gitHubUsers: [],
  usersNumber: null,
};

export const usersHasErroredReducer = (
  state: State.usersHasErrored = initialState.usersHasErrored,
  action: UsersAction
) => {
  switch (action.type) {
    case 'USERS_HAS_ERRORED':
      return action.usersHasErrored;
    default:
      return state;
  }
};

export const usersIsLoadingReducer = (
  state: State.usersIsLoading = initialState.usersIsLoading,
  action: UsersAction
) => {
  switch (action.type) {
    case 'USERS_IS_LOADING':
      return action.usersIsLoading;
    default:
      return state;
  }
};

export const gitHubUsersReducer = (
  state: State.gitHubUsers = initialState.gitHubUsers,
  action: UsersAction
) => {
  switch (action.type) {
    case 'USERS_FETCH_DATA_SUCCESS':
      return action.gitHubUsers;
    case 'MORE_USERS_FETCH_DATA_SUCCESS':
      return [...state, ...action.moreUsers];
    default:
      return state;
  }
};

export const usersNumberReducer = (
  state: State.usersNumber = initialState.usersNumber,
  action: UsersAction
) => {
  switch (action.type) {
    case 'USERS_NUMBER':
      return action.usersNumber;
    default:
      return state;
  }
};

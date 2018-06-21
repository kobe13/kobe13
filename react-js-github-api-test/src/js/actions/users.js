// @flow
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import type { ThunkAction } from './index';

type usersHasErroredAction = {
  type: 'USERS_HAS_ERRORED',
  usersHasErrored: boolean,
};
const usersHasErrored = (boolean: boolean): usersHasErroredAction => ({
  type: 'USERS_HAS_ERRORED',
  usersHasErrored: boolean,
});

type usersIsLoadingAction = {
  type: 'USERS_IS_LOADING',
  usersIsLoading: boolean,
};
const usersIsLoading = (boolean: boolean): usersIsLoadingAction => ({
  type: 'USERS_IS_LOADING',
  usersIsLoading: boolean,
});

type usersDataAction = {
  type: 'USERS_FETCH_DATA_SUCCESS',
  gitHubUsers: [] | null,
};
const usersData = (gitHubUsers: [] | null): usersDataAction => ({
  type: 'USERS_FETCH_DATA_SUCCESS',
  gitHubUsers,
});

type usersNumberAction = {
  type: 'USERS_NUMBER',
  usersNumber: number | null,
};
const usersNumber = (number: number | null): usersNumberAction => ({
  type: 'USERS_NUMBER',
  usersNumber: number,
});

type loadMoreUsersAction = {
  type: 'MORE_USERS_FETCH_DATA_SUCCESS',
  moreUsers: [],
};
export const loadMoreUsers = (moreUsers: []): loadMoreUsersAction => ({
  type: 'MORE_USERS_FETCH_DATA_SUCCESS',
  moreUsers,
});

export type UsersAction =
  | usersHasErroredAction
  | usersIsLoadingAction
  | usersDataAction
  | usersNumberAction
  | loadMoreUsersAction;

// get GitHub Users
export const fetchUsers = (usersSince: number = 0): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(usersHasErrored(false));
  dispatch(usersIsLoading(true));
  dispatch(showLoading());

  fetch(`https://api.github.com/users?since=${usersSince}&per_page=8`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(usersIsLoading(false));

      return response;
    })
    .then(response => response.json())
    .then(users => {
      dispatch(hideLoading());
      if (usersSince === 0) {
        // get initial GitHub Users
        dispatch(usersData(users));
      } else {
        // get more GitHub Users
        dispatch(loadMoreUsers(users));
      }
      dispatch(usersNumber(getState().usersData.gitHubUsers.length));
    })
    .catch(() => {
      dispatch(usersHasErrored(true));
      dispatch(usersIsLoading(false));
      dispatch(hideLoading());
    });
};

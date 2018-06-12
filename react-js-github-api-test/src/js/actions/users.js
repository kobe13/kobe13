import { showLoading, hideLoading } from 'react-redux-loading-bar';

const usersHasErrored = boolean => ({
  type: 'USERS_HAS_ERRORED',
  usersHasErrored: boolean,
});

const usersIsLoading = boolean => ({
  type: 'USERS_IS_LOADING',
  usersIsLoading: boolean,
});

const usersData = gitHubUsers => ({
  type: 'USERS_FETCH_DATA_SUCCESS',
  gitHubUsers,
});

const usersNumber = number => ({
  type: 'USERS_NUMBER',
  usersNumber: number,
});

export const loadMoreUsers = moreUsers => ({
  type: 'MORE_USERS_FETCH_DATA_SUCCESS',
  moreUsers,
});

// get GitHub Users
export const fetchUsers = (usersSince = 0) => (dispatch, getState) => {
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

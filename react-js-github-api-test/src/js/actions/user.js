import { showLoading, hideLoading } from 'react-redux-loading-bar';

const currentUserHasErrored = boolean => ({
  type: 'CURRENT_USER_HAS_ERRORED',
  currentUserHasErrored: boolean,
});

const currentUserIsLoading = boolean => ({
  type: 'CURRENT_USER_IS_LOADING',
  currentUserIsLoading: boolean,
});

export const currentUserData = gitHubUser => ({
  type: 'CURRENT_USER_FETCH_DATA_SUCCESS',
  gitHubUser,
});

// get GitHub Users
export const fetchUserDetail = userLogin => dispatch => {
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

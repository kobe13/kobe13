export const currentUserHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'CURRENT_USER_HAS_ERRORED':
      return action.currentUserHasErrored;
    default:
      return state;
  }
};

export const currentUserIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'CURRENT_USER_IS_LOADING':
      return action.currentUserIsLoading;
    default:
      return state;
  }
};

export const gitHubUser = (state = [], action) => {
  switch (action.type) {
    case 'CURRENT_USER_FETCH_DATA_SUCCESS':
      return action.gitHubUser;
    default:
      return state;
  }
};

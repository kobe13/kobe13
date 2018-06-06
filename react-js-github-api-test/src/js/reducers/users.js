export const usersHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'USERS_HAS_ERRORED':
      return action.usersHasErrored;
    default:
      return state;
  }
};

export const usersIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'USERS_IS_LOADING':
      return action.usersIsLoading;
    default:
      return state;
  }
};

export const gitHubUsers = (state = [], action) => {
  switch (action.type) {
    case 'USERS_FETCH_DATA_SUCCESS':
      return action.gitHubUsers;
    case 'MORE_USERS_FETCH_DATA_SUCCESS':
      return [...state, ...action.moreUsers];
    default:
      return state;
  }
};

export const usersNumber = (state = null, action) => {
  switch (action.type) {
    case 'USERS_NUMBER':
      return action.usersNumber;
    default:
      return state;
  }
};

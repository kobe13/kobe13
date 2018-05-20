export const projectsHasErrored = (state = null, action) => {
  switch (action.type) {
    case 'PROJECTS_HAS_ERRORED':
      return action.projectsHasErrored;
    default:
      return state;
  }
};

export const projectsIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'PROJECTS_IS_LOADING':
      return action.projectsIsLoading;
    default:
      return state;
  }
};

export const projectsNumber = (state = null, action) => {
  switch (action.type) {
    case 'PROJECTS_NUMBER':
      return action.projectsNumber;
    default:
      return state;
  }
};

export const projects = (state = null, action) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_DATA_SUCCESS':
      return action.projects;
    default:
      return state;
  }
};

export const contributorsHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_HAS_ERRORED':
      return action.contributorsHasErrored;
    default:
      return state;
  }
};

export const contributorsIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_IS_LOADING':
      return action.contributorsIsLoading;
    default:
      return state;
  }
};

export const projectContributors = (state = null, action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_FETCH_DATA_SUCCESS':
      return action.contributors;
    default:
      return state;
  }
};

export const projectInfo = (state = null, action) => {
  switch (action.type) {
    case 'PROJECT_INFO_FETCH_DATA_SUCCESS':
      return action.projectInfo;
    default:
      return state;
  }
};

export const projectsHasErrored = boolean => ({
  type: 'PROJECTS_HAS_ERRORED',
  projectsHasErrored: boolean,
});

export const projectsIsLoading = boolean => ({
  type: 'PROJECTS_IS_LOADING',
  projectsIsLoading: boolean,
});

export const projectsNumber = number => ({
  type: 'PROJECTS_NUMBER',
  projectsNumber: number,
});

export const projectsData = projects => ({
  type: 'PROJECTS_FETCH_DATA_SUCCESS',
  projects,
});

export const projectDetail = projectInfo => ({
  type: 'PROJECT_INFO_FETCH_DATA_SUCCESS',
  projectInfo,
});

export const projectContributors = contributors => ({
  type: 'CONTRIBUTORS_FETCH_DATA_SUCCESS',
  contributors,
});

export const contributorsHasErrored = boolean => ({
  type: 'CONTRIBUTORS_HAS_ERRORED',
  contributorsHasErrored: boolean,
});

export const contributorsIsLoading = boolean => ({
  type: 'CONTRIBUTORS_IS_LOADING',
  contributorsIsLoading: boolean,
});

// get all projects of an organisation
export const fetchProjects = org => (dispatch) => {
  dispatch(projectsHasErrored(false));
  dispatch(projectsIsLoading(true));

  fetch(`https://api.github.com/orgs/${org}/repos`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(projectsIsLoading(false));
      return response;
    })
    .then(response => response.json())
    .then((projects) => {
      dispatch(projectsData(projects.sort((a, b) => b.watchers - a.watchers)));
      dispatch(projectsNumber(projects.length));
      dispatch(projectsIsLoading(false));
    })
    .catch(() => {
      dispatch(projectsHasErrored(true));
      dispatch(projectsIsLoading(false));
    });
};

// get all contributors of a project
export const fetchProjectContributors = url => (dispatch) => {
  dispatch(contributorsHasErrored(false));
  dispatch(contributorsIsLoading(true));

  fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .then((contributors) => {
      dispatch(projectContributors(contributors));
      dispatch(contributorsIsLoading(false));
    })
    .catch(() => {
      dispatch(contributorsHasErrored(true));
      dispatch(contributorsIsLoading(false));
    });
};

export const projectsCleanUp = () => (dispatch) => {
  dispatch(projectsHasErrored(false));
  dispatch(projectsData(null));
  dispatch(projectContributors(null));
  dispatch(projectDetail(null));
  dispatch(projectsNumber(null));
};

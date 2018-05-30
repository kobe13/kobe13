import { combineReducers } from 'redux';
import {
  projects,
  projectsHasErrored,
  projectsIsLoading,
  projectsNumber,
  contributorsHasErrored,
  contributorsIsLoading,
  projectInfo,
  projectContributors,
} from './projects';
import orgName from './org';

const contributors = combineReducers({
  projectContributors,
  contributorsHasErrored,
  contributorsIsLoading,
});

const project = combineReducers({
  projectInfo,
  contributors,
});

const projectsData = combineReducers({
  projects,
  projectsHasErrored,
  projectsIsLoading,
  projectsNumber,
  project,
});

const orgData = combineReducers({
  orgName,
});

export default combineReducers({
  projectsData,
  orgData,
});

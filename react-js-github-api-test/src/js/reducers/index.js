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

export default combineReducers({
  projects,
  projectsHasErrored,
  projectsIsLoading,
  projectsNumber,
  contributorsHasErrored,
  contributorsIsLoading,
  projectInfo,
  orgName,
  projectContributors,
});

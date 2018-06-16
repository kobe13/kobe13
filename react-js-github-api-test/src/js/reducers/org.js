// @flow
import type { OrgNameAction } from '../actions/org';
import State from './index';

const orgName = (state: State = null, action: OrgNameAction) => {
  switch (action.type) {
    case 'ORG_NAME':
      return action.orgName;
    default:
      return state;
  }
};

export default orgName;

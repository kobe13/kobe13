// @flow
import type { OrgNameAction } from '../actions/org';

export type State = {
  orgName: string | null,
};

export const initialState: State = {
  orgName: null,
};

export const orgNameReducer = (
  state: State.orgName = initialState.orgName,
  action: OrgNameAction
) => {
  switch (action.type) {
    case 'ORG_NAME':
      return action.orgName;
    default:
      return state;
  }
};

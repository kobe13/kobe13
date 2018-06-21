// @flow
import type { OrgNameAction } from './org';
import type { ProjectsAction } from './projects';
import type { UsersAction } from './users';
import type { UserAction } from './user';
import type { State } from '../reducers';

type Action = OrgNameAction | ProjectsAction | UsersAction | UserAction;

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

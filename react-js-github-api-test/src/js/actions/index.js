// @flow
import type { OrgNameAction } from './org';
import type { Action as ProjectsAction } from './projects';
import type { UsersAction, UsersState } from './users';
import type { Action as UserAction } from './user';

type Action = OrgNameAction | ProjectsAction | UsersAction | UserAction;

type State = UsersState;

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

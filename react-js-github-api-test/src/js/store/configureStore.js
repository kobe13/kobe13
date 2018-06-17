// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { State, initState } from '../reducers';

export default function configureStore(initialState: State = initState()) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

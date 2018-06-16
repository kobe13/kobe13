// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import State from '../reducers';

export default function configureStore(initialState: State) {
  return createStore(State, initialState, applyMiddleware(thunk));
}

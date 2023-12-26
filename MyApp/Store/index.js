import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {createInjectorsEnhancer} from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import globalReducer from './Global/global';

function createReducer(injectReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    ...injectReducers,
  });
  return rootReducer;
}

let composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware();
const runSaga = sagaMiddleware.run;

const injectEnhancer = createInjectorsEnhancer({
  createReducer,
  runSaga,
});

const middlewares = [sagaMiddleware];

export const store = createStore(
  createReducer(),
  {},
  composeEnhancers(applyMiddleware(...middlewares), injectEnhancer),
);

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const logger = createLogger({
  diff: true,
  duration: true,
  collapsed: true,
  logErrors: true,
});

const middlewares = [ thunk ];
const initialState = {};

const devTools =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares, logger));

const store = createStore(rootReducer, initialState, devTools);

export default store;

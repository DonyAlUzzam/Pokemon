import  { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

import reducers from '../reducers/index';

export const store = createStore(reducers, {}, applyMiddleware(logger, promise))
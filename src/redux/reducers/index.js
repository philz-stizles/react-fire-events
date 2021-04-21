import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import eventsReducer from './eventsReducer';
import modalReducer from './modalReducer';
import profileReducer from './profileReducer';
import asyncReducer from './asyncReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  events: eventsReducer,
  modal: modalReducer,
  profile: profileReducer,
  async: asyncReducer
});

export default rootReducer;

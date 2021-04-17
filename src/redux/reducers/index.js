import { combineReducers } from 'redux';

import authReducer from './authReducer';
import eventsReducer from './eventsReducer';
import modalReducer from './modalReducer';
import profileReducer from './profileReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  modal: modalReducer,
  profile: profileReducer,
  async: asyncReducer
});

export default rootReducer;

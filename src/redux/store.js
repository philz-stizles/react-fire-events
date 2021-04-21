import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { verifyAuth } from './actions/authActions';
import rootReducer from './reducers';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(verifyAuth());

export default store;
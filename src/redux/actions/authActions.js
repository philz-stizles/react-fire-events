import { APP_LOADED, SIGN_IN, SIGN_OUT } from "../types";
import firebase from '../../api/firebase';

export const signin = (user) => {
  return { 
    type: SIGN_IN, 
    payload: user 
  };
}

export const verifyAuth = () => {
  return dispatch => {
    return firebase.auth().onAuthStateChanged(user => {
      if(user) {
        dispatch(signin(user));
        dispatch({ type: APP_LOADED })
      } else {
        dispatch(signout())
        dispatch({ type: APP_LOADED })
      }
    });
  }
}

export const signout = () => {
  return { 
    type: SIGN_OUT 
  };
}
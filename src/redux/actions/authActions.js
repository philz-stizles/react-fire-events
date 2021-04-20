import { APP_LOADED, SIGN_IN, SIGN_OUT } from "../types";
import firebase from '../../api/firebase';
import { listenToUserFromFirestore, transformSnapshot } from '../../api/firestoreServices';
import { listenToCurrentUserProfile } from "./profileActions";

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
        const profileRef = listenToUserFromFirestore(user.uid);
        profileRef.onSnapshot(snapshot => {
          dispatch(listenToCurrentUserProfile(transformSnapshot(snapshot)))
          dispatch({ type: APP_LOADED })
        })
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
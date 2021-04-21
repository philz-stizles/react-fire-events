import { SIGN_IN, SIGN_OUT } from "../types";
import { LOCATION_CHANGE } from "connected-react-router";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  previousLocation: null,
  currentLocation: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SIGN_IN:
    return { ...state, isAuthenticated: true, currentUser: {
      uid: payload.uid,
      email: payload.email,
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      providerId: payload.providerData[0].providerId
    } }

  case SIGN_OUT:
    return { ...state, isAuthenticated: false, currentUser: null }
  
  case LOCATION_CHANGE:
    return { 
      ...state, 
      previousLocation: state.currentLocation, 
      currentLocation: payload.location 
    }


  default:
    return state
  }
}

export default authReducer

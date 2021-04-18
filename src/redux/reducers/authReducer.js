import { SIGN_IN, SIGN_OUT } from "../types"

const initialState = {
  isAuthenticated: false,
  currentUser: null
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

  default:
    return state
  }
}

export default authReducer

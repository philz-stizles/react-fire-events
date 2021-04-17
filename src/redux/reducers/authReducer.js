import { SIGN_IN, SIGN_OUT } from "../types"

const initialState = {
  isAuthenticated: false,
  currentUser: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SIGN_IN:
    return { ...state, isAuthenticated: true, currentUser: payload }

  case SIGN_OUT:
    return { ...state, isAuthenticated: false, currentUser: null }

  default:
    return state
  }
}

export default authReducer

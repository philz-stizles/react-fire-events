const initialState = {
  isAuthenticated: true,
  user: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case '':
    return { ...state, ...payload }

  default:
    return state
  }
}

export default authReducer

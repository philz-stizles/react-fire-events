const initialState = {
  items: []
}

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case '':
    return { ...state, ...payload }

  default:
    return state
  }
}

export default eventsReducer

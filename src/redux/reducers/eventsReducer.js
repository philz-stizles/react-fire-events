import { CREATE_EVENT, UPDATE_EVENT } from "../types"

const initialState = {
  items: []
}

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case CREATE_EVENT:
    return { ...state, ...payload }

  case UPDATE_EVENT:
    return { ...state, ...payload }

  default:
    return state
  }
}

export default eventsReducer

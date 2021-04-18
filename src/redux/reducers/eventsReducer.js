import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "../types";

const initialState = {
  items: []
}

const eventsReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case FETCH_EVENTS:
    return { 
      ...state, 
      items: payload 
    };

  case CREATE_EVENT:
    return { 
      ...state, 
      items: [...state.items, payload] 
    };

  case UPDATE_EVENT:
    return { 
      ...state, 
      items: [...state.items.filter(item => item.id !== payload.id), payload] 
    };
  
  case DELETE_EVENT:
    return { 
      ...state, 
      items: [...state.items.filter(item => item.id !== payload)] 
    };

  default:
    return state;
  }
}

export default eventsReducer;

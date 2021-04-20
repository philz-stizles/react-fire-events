import { CLEAR_EVENT_CHAT, CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, UPDATE_EVENT } from "../types";

const initialState = {
  items: [],
  comments: []
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

  case LISTEN_TO_EVENT_CHAT:
      return { 
        ...state, 
        comments: payload 
      };

  case CLEAR_EVENT_CHAT:
      return { 
        ...state, 
        comments: []
      };

  default:
    return state;
  }
}

export default eventsReducer;

import { fetchEventsFromFirestore, transformSnapshot } from "../../api/firestoreServices";
import { CREATE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, UPDATE_EVENT,  CLEAR_EVENTS, LISTEN_TO_SELECTED_EVENT } from "../types";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "./asyncActions";

export const fetchEvents = (predicate, lastDocSnapshot, limit) => {
  return async (dispatch) => {
    dispatch(asyncActionStart());

    try {
      const snapshot = await fetchEventsFromFirestore(predicate, lastDocSnapshot, limit).get();
      console.log('snapshot', snapshot);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map(doc => transformSnapshot(doc));
      dispatch({ type: FETCH_EVENTS, payload: { events, moreEvents } });
      dispatch(asyncActionFinish());

      return lastVisible;
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const listenForEvents = (events) => ({ type: FETCH_EVENTS, payload: events });

export const createEvent = (event) => ({ type: CREATE_EVENT, payload: event });

export const updateEvent = (event) => ({ type: UPDATE_EVENT, payload: event });

export const deleteEvent = (eventId) => ({ type: UPDATE_EVENT, payload: eventId });

export const listenToEventChats = (comments) => ({ type: LISTEN_TO_EVENT_CHAT, payload: comments });

export const clearEvents = () => ({ type: CLEAR_EVENTS });

export const listenToSelectedEvent = (event) => ({ type: LISTEN_TO_SELECTED_EVENT, payload: event });
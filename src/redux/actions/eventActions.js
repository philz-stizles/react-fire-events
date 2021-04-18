import { CREATE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "../types";

export const listenForEvents = (events) => ({ type: FETCH_EVENTS, payload: events });

export const createEvent = (event) => ({ type: CREATE_EVENT, payload: event });

export const updateEvent = (event) => ({ type: UPDATE_EVENT, payload: event });

export const deleteEvent = (eventId) => ({ type: UPDATE_EVENT, payload: eventId });
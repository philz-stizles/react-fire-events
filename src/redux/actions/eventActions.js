import { CREATE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT, UPDATE_EVENT } from "../types";

export const listenForEvents = (events) => ({ type: FETCH_EVENTS, payload: events });

export const createEvent = (event) => ({ type: CREATE_EVENT, payload: event });

export const updateEvent = (event) => ({ type: UPDATE_EVENT, payload: event });

export const deleteEvent = (eventId) => ({ type: UPDATE_EVENT, payload: eventId });

export const listenToEventChats = (comments) => ({ type: LISTEN_TO_EVENT_CHAT, payload: comments });
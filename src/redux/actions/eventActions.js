import { CREATE_EVENT, UPDATE_EVENT } from "../types";

export const createEvent = (payload) => ({ type: CREATE_EVENT, payload });

export const updateEvent = (payload) => ({ type: UPDATE_EVENT, payload });
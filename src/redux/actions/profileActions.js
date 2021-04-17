import { LISTEN_TO_CURRENT_USER_PROFILE } from "../types";

export const listenToCurrentUserProfile = (profile) => ({ type: LISTEN_TO_CURRENT_USER_PROFILE, profile });
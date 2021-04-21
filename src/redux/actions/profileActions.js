import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
  SET_ISFOLLOWING_USER,
  SET_ISNOTFOLLOWING_USER,
} from "../types";

export const listenToCurrentUserProfile = (profile) => ({
  type: LISTEN_TO_CURRENT_USER_PROFILE,
  payload: profile,
});

export const listenToSelectedUserProfile = (profile) => ({
  type: LISTEN_TO_SELECTED_USER_PROFILE,
  payload: profile,
});

export const listenToUserPhotos = (photos) => ({
  type: LISTEN_TO_USER_PHOTOS,
  payload: photos,
});

export const listenToUserEvents = (events) => ({
  type: LISTEN_TO_USER_EVENTS,
  payload: events,
});

export const listenToFollowers = (followers) => ({
  type: LISTEN_TO_FOLLOWERS,
  payload: followers,
});

export const listenToFollowings = (followings) => ({
  type: LISTEN_TO_USER_EVENTS,
  payload: followings,
});

export const setIsFollowingUser = () => ({ type: SET_ISFOLLOWING_USER });

export const setIsNotFollowingUser = () => ({ type: SET_ISNOTFOLLOWING_USER });

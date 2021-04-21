import {
  CLEAR_FOLLOWINGS,
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
  SET_ISFOLLOWING_USER,
  SET_ISNOTFOLLOWING_USER,
} from "../types";

const initialState = {
  currentUserProfile: null,
  photos: [],
  profileEvents: [],
  selectedUserProfile: null,
  followers: [],
  followings: [],
  isFollowingUser: false,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return { ...state, currentUserProfile: payload };

    case LISTEN_TO_SELECTED_USER_PROFILE:
      return { ...state, selectedUserProfile: payload };

    case LISTEN_TO_USER_PHOTOS:
      return { ...state, photos: payload };

    case LISTEN_TO_USER_EVENTS:
      return { ...state, profileEvents: payload };

    case LISTEN_TO_FOLLOWERS:
      return { ...state, followers: payload };

    case LISTEN_TO_FOLLOWINGS:
      return { ...state, followings: payload };

    case SET_ISFOLLOWING_USER:
      return { ...state, isFollowingUser: true };

    case SET_ISNOTFOLLOWING_USER:
      return { ...state, isFollowingUser: false };

    case CLEAR_FOLLOWINGS:
      return { ...state, followers: [], followings: [] };

    default:
      return state;
  }
};

export default profileReducer;

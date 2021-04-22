import firebase from "./firebase";

const db = firebase.firestore();

// EVENTS
export const transformSnapshot = (snapshot) => {
  if (!snapshot.exists) return undefined;

  // Retrieve the document id from the snapshot and add it to the data
  const data = snapshot.data();

  // convert to javascript date
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return { ...data, id: snapshot.id };
};

// Retrieve events collection from firestore
// export const listenToEventsFromFirestore = () => db.collection('events');
// export const listenToEventsFromFirestore = (
//   predicate,
//   lastDocSnapshot = null,
//   limit
// ) => {
//   console.log(predicate);
//   const user = firebase.auth().currentUser;
//   let eventRef = db
//     .collection("events")
//     .orderBy('date')
//     .startAfter(lastDocSnapshot)
//     .limit(limit);

//   switch (predicate.get("filter")) {
//     case "isGoing":
//       console.log("isGoing");
//       return eventRef.where("attendeesIds", "array-contains", user.uid);
//     // .where('date', '>=', predicate.get('startDate'));

//     case "isHosting":
//       console.log("ishosting");
//       console.log(user.uid);
//       return eventRef.where("hostUid", "==", user.uid);
//     // .where('date', '>=', predicate.get('startDate'))

//     default:
//       console.log("all");
//       return eventRef;
//     // .where('date', '>=', predicate.get('startDate'))
//   }
// };

// Retrieve events collection from firestore
// export const listenToEventsFromFirestore = () => db.collection('events');
export const fetchEventsFromFirestore = (
  predicate,
  lastDocSnapshot = null,
  limit
) => {
  const user = firebase.auth().currentUser;
  let eventRef = db
    .collection("events")
    .orderBy('date')
    .startAfter(lastDocSnapshot)
    .limit(limit);

  switch (predicate.get("filter")) {
    case "isGoing":
      console.log("isGoing");
      console.log(" user.uid",  user.uid);
      return eventRef
        .where("attendeesIds", "array-contains", user.uid)
        .where('date', '>=', predicate.get('startDate'));

    case "isHosting":
      console.log("ishosting");
      console.log("user.uid",  user);
      return eventRef
        .where("hostUid", "==", user.uid)
        .where('date', '>=', predicate.get('startDate'));

    default:
      console.log("all");
      console.log(eventRef);
      return eventRef
        .where('date', '>=', predicate.get('startDate'));
  }
};

// Retrieve single event doc from firestore
export const listenToEventFromFirestore = (eventId) =>
  db.collection("events").doc(eventId);

export const addEventToFirestore = (event) => {
  const user = firebase.auth().currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
};

export const updateEventInFirestore = (event) =>
  db.collection("events").doc(event.id).update(event);

export const deleteEventInFirestore = (eventId) =>
  db.collection("events").doc(eventId).delete();

export const cancelEventToggleInFirestore = (event) =>
  db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });

// USERS
export const fireSetUserProfileData = (user) => {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const listenToUserFromFirestore = (userId) =>
  db.collection("users").doc(userId);

export const updateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({ displayName: profile.displayName });
    }

    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db
        .collection("users")
        .doc(user.uid)
        .update({ photoURL: downloadURL });

      await user.updateProfile({ photoURL: downloadURL });
    }

    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userUid) =>
  db.collection("users").doc(userUid).collection("photos");

export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;

  try {
    await db.collection("users").doc(user.uid).update({ photoURL: photo.url });

    return await user.updateProfile({ photoURL: photo.url });
  } catch (error) {
    throw error;
  }
};

export const deletePhotoFromCollection = (photoId) => {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
};

export const addUserAttendance = (eventId) => {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(eventId)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
};

export const cancelUserAttendance = async (eventId) => {
  const user = firebase.auth().currentUser;

  try {
    const eventDoc = await db.collection("events").doc(eventId).get();
    return db
      .collection("events")
      .doc(eventId)
      .update({
        attendeesIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
};

export const getUserEvents = (userUid, activeTab) => {
  let eventsRef = db.collection("events");
  const today = new Date();

  switch (activeTab) {
    case 1: // Past Events - events that the user was an attendee, and the date is less than or equal to today
      console.log(1);
      return eventsRef
        .where("attendeesIds", "array-contains", userUid)
        .where("date", "<=", today)
        .orderBy("date", "desc");

    case 2: // Hosting - events that the user is a host
      console.log(2);
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");

    default:
      // Future Events - events that the user is an attendee
      console.log("others");
      return eventsRef
        .where("attendeesIds", "array-contains", userUid)
        .where("date", ">=", today)
        .orderBy("date");
  }
};

// This function is a candidate for firebase batching because we are performing multiple requests.
// The function is only valid if all the requests are successful.
// With firebase batching, if any one request fails, then the entire function fails and any successful requests
// besides the failed request(s) will be rolled back
export const followUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.set(
      db
        .collection("followership")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id),
      {
        uid: profile.id,
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      }
    );

    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });

    return await batch.commit();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unFollowUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    batch.delete(
      db
        .collection("followership")
        .doc(user.uid)
        .collection("userFollowings")
        .doc(profile.id)
    );

    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const getFollowersCollection = (profileId) => {
  return db
    .collection("followership")
    .doc(profileId)
    .collection("userFollowers");
};

export const getFollowingsCollection = (profileId) => {
  return db
    .collection("followership")
    .doc(profileId)
    .collection("userFollowings");
};

export const getFollowingDoc = (profileId) => {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("followership")
    .doc(userUid)
    .collection("userFollowings")
    .doc(profileId)
    .get();
};

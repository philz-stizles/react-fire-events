import firebase from './firebase';

const db = firebase.firestore();

// EVENTS
export const transformSnapshot = (snapshot) => {
  if(!snapshot.exists) return undefined;

  // Retrieve the document id from the snapshot and add it to the data
  const data = snapshot.data();

  // convert to javascript date
  for(let prop in data) {
    if(data.hasOwnProperty(prop)) {
      if(data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return { ...data, id: snapshot.id }  
}

// Retrieve events collection from firestore
export const listenToEventsFromFirestore = (predicate) => {
  console.log(predicate)
  const user = firebase.auth().currentUser;
  let eventRef = db.collection('events')
  // .orderBy('date');

  switch (predicate.get('filter')) {
    case 'isGoing':
      console.log('isGoing')
        return eventRef
          .where('attendeesIds', 'array-contains', user.uid)
          // .where('date', '>=', predicate.get('startDate'));
    
    case 'isHosting':
      console.log('ishosting')
      console.log(user.uid)
      return eventRef
          .where('hostUid', '==', user.uid)
          // .where('date', '>=', predicate.get('startDate'))

    default:
      console.log('all')
      return eventRef
      // .where('date', '>=', predicate.get('startDate'))
  }
}

// Retrieve single event doc from firestore
export const listenToEventFromFirestore = (eventId) => db.collection('events').doc(eventId);

export const addEventToFirestore = (event) => {
  const user = firebase.auth().currentUser;
  return db.collection('events').add({
    ...event,
    hostUid: user.uid, 
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
  });
}

export const updateEventInFirestore = (event) => db.collection('events').doc(event.id).update(event);

export const deleteEventInFirestore = (eventId) => db.collection('events').doc(eventId).delete();

export const cancelEventToggleInFirestore = (event) => db.collection('events').doc(event.id).update({
  isCancelled: !event.isCancelled
});

// USERS
export const fireSetUserProfileData = (user) => { 
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

export const listenToUserFromFirestore = (userId) => db.collection('users').doc(userId);

export const updateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;
  try {
    if(user.displayName !== profile.displayName) {
      await user.updateProfile({ displayName: profile.displayName });
    }

    return await db.collection('users').doc(user.uid).update(profile);
    
  } catch (error) {
    throw error;
  }
}

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if(! userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({ photoURL: downloadURL });

      await user.updateProfile({ photoURL: downloadURL })
    }

    return await db.collection('users').doc(user.uid).collection('photos').add({ 
      name: filename, 
      url: downloadURL
    });
    
  } catch (error) {
    throw error;
  }
}

export const getUserPhotos = (userUid) => db.collection('users').doc(userUid).collection('photos');


export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;

  try {
    await db.collection('users').doc(user.uid).update({ photoURL: photo.url });
    
    return await user.updateProfile({ photoURL: photo.url })
  } catch (error) {
    throw error;
  }
}

export const deletePhotoFromCollection = (photoId) => {
  const userUid = firebase.auth().currentUser.uid;
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
}

export const addUserAttendance = (eventId) => {
  const user = firebase.auth().currentUser;
  return db.collection('events').doc(eventId).update({
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
  })
}

export const cancelUserAttendance = async (eventId) => {
  const user = firebase.auth().currentUser;

  try {
    const eventDoc = await db.collection('events').doc(eventId).get();
    return db.collection('events').doc(eventId).update({
      attendeesIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
      attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
    })
  } catch (error) {
    throw(error);
  }
}
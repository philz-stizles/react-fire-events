import firebase from './firebase';

const db = firebase.firestore();

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

// METHOD 2
// export const listenToEventsFromFirestore = (observer) => db.collection('events').onSnapshot(observer);

export const listenToEventsFromFirestore = () => db.collection('events');

export const fireSetUserProfileData = (user) => { 
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

export const fireGetUserProfile = (userId) => db.collection('users').doc(userId);
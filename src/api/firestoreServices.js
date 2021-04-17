import firebase from './firebase';

const db = firebase.firestore();

export const fireSetUserProfile = (user) => db.collection('users').doc(user.uid).set({
  displayName: user.displayName,
  email: user.email,
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

export const fireSetUserProfileData = (userId) => db.collection('users').doc(userId);
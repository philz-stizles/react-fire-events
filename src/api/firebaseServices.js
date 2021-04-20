import { toast } from 'react-toastify';
import firebase from './firebase';
import { fireSetUserProfileData } from './firestoreServices';

export const firebaseObjectToArray = (snapshot) => {
  if(snapshot) {
    console.log(snapshot)
    return Object.entries(snapshot).map(e => Object.assign({}, e[1], { id: e[0]} ));
  } 
}

export const signInWithEmail = ({email, password}) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const fireRegister = async ({ displayName, email, password }) => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(result);
    await result.user.updateProfile({ displayName });
    return await fireSetUserProfileData(result.user);

  } catch (error) {
    
    throw error;
  }
}

export const fireSocialLogin = async (selectedProvider) => {
  let provider;

  if(selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } 
  
  if(selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  if(selectedProvider === 'github') {
    provider = new firebase.auth.GithubAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);

    // Only set user profile if the user is a new user. We can make use of "isNewUser" property
    if(result.additionalUserInfo.isNewUser) {
      await fireSetUserProfileData(result.user);
    }

  } catch (error) {
    toast.error(error.message);
  }
}

export const fireSignOut = () => firebase.auth().signOut();

export const fireUpdateUserPassword = (credentials) => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(credentials.newPassword);
}

export const uploadToFirebaseStorage = (file, filename) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export const deleteFromFirebaseStorage = (filename) => {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}

export const addEventChatComment = (eventId, values) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId
  }
  
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export const getEventChatRef = (eventId) => firebase.database().ref(`chat/${eventId}`).orderByKey();
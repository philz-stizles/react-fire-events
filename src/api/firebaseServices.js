import firebase from './firebase';
import { fireSetUserProfileData } from './firestoreServices';

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

export const fireSignOut = () => firebase.auth().signOut();
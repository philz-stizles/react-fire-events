import { toast } from 'react-toastify';
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
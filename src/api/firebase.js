import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIMknUblZRm5Ffz9wuxDwyA2Y0TJjYZiM",
  authDomain: "re-vents-8e7cb.firebaseapp.com",
  projectId: "re-vents-8e7cb",
  storageBucket: "re-vents-8e7cb.appspot.com",
  messagingSenderId: "876723299737",
  appId: "1:876723299737:web:7d6c49252eb3632efb5f08"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
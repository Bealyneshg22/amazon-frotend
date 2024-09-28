import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGtqoqvKaW-mviMJwFLfogVMw-NfUe5Zo",
  authDomain: "clone-56a66.firebaseapp.com",
  projectId: "clone-56a66",
  storageBucket: "clone-56a66.appspot.com",
  messagingSenderId: "971924123491",
  appId: "1:971924123491:web:41bfd66611327b7950ed56",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

// Import required Firebase modules (Modular SDK)
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyCbcfX9CGbvmiAYVy3jIpMrmoJSM5Jk8Yc",
  authDomain: "real-time-chat-app-906d2.firebaseapp.com",
  projectId: "real-time-chat-app-906d2",
  storageBucket: "real-time-chat-app-906d2.appspot.com",
  messagingSenderId: "331644956207",
  appId: "1:331644956207:web:171e20f77a2d50008fa0da"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

// Export the instances for use in other parts of the app
export { auth, firestore, db };

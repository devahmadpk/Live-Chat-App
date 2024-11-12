import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase config values 
const firebaseConfig = {
    apiKey: "AIzaSyCbcfX9CGbvmiAYVy3jIpMrmoJSM5Jk8Yc",
    authDomain: "real-time-chat-app-906d2.firebaseapp.com",
    projectId: "real-time-chat-app-906d2",
    storageBucket: "real-time-chat-app-906d2.firebasestorage.app",
    messagingSenderId: "331644956207",
    appId: "1:331644956207:web:171e20f77a2d50008fa0da"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

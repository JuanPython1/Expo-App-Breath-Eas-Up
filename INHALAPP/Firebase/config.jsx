// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxeAPzMfHxcjDZCd_VlFbveNcyPTWLXyU",
  authDomain: "inhalapp.firebaseapp.com",
  projectId: "inhalapp",
  storageBucket: "inhalapp.appspot.com",
  messagingSenderId: "590459159262",
  appId: "1:590459159262:web:2b1bdfe1ff6b1ea677b84f",
  measurementId: "G-0CT7QRM9R7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

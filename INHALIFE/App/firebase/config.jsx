import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserSessionPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID
}


// const firebaseConfig = {
//   apiKey: "AIzaSyAxeAPzMfHxcjDZCd_VlFbveNcyPTWLXyU",
//   authDomain: "inhalapp.firebaseapp.com",
//   projectId: "inhalapp",
//   storageBucket: "inhalapp.appspot.com",
//   messagingSenderId: "590459159262",
//   appId: "1:590459159262:web:2b1bdfe1ff6b1ea677b84f",
//   measurementId: "G-0CT7QRM9R7"
// };

export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(AsyncStorage),
});

export const FIRESTORE_DB = getFirestore(app)
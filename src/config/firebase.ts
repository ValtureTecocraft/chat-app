// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByi9wLufe17zB5vUz9_4o-bleIrOHJJNc",
  authDomain: "chat-web-app-937ad.firebaseapp.com",
  projectId: "chat-web-app-937ad",
  storageBucket: "chat-web-app-937ad.appspot.com",
  messagingSenderId: "1070368817164",
  appId: "1:1070368817164:web:d6add8c950b21e84372e29",
  measurementId: "G-7XE91PRPVK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();

export const googleProvider = new GoogleAuthProvider();

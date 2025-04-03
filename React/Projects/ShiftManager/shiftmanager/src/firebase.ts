// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClLLY6MXOhzqQLbxhpP0tbWp_AL0sHPGQ",
  authDomain: "myprojectshiftmanager.firebaseapp.com",
  projectId: "myprojectshiftmanager",
  storageBucket: "myprojectshiftmanager.firebasestorage.app",
  messagingSenderId: "811066662624",
  appId: "1:811066662624:web:3ad607ca998404e477ba85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

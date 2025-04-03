import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZH2UOKjdvfWlYrpxNmYLLfCyu2ZiuhPo",
  authDomain: "mar-b1f03.firebaseapp.com",
  projectId: "mar-b1f03",
  storageBucket: "mar-b1f03.firebasestorage.app",
  messagingSenderId: "774143689511",
  appId: "1:774143689511:web:c4fa7542657bb82b11df02",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

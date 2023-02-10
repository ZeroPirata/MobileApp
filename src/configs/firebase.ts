import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { authUrl } from "./google";
import { getStorage } from "firebase/storage";

// Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDh3STJd0L1NtGjUHZwLuiLcDBcReWatHQ",
  authDomain: "leagueofzero-da338.firebaseapp.com",
  projectId: "leagueofzero-da338",
  storageBucket: "leagueofzero-da338.appspot.com",
  messagingSenderId: "339065098005",
  appId: "1:339065098005:web:1bd91afd5e9eb554d9e31c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authFirebase = getAuth(app);
export const storage = getStorage(app);

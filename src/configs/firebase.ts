import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Firebase

const firebaseConfig = {
  apiKey: "",
  authDomain: "leagueofzero-da338.firebaseapp.com",
  projectId: "leagueofzero-da338",
  storageBucket: "leagueofzero-da338.appspot.com",
  messagingSenderId: "339065098005",
  appId: "1:339065098005:web:1bd91afd5e9eb554d9e31c",
  databaseUrl: "https://leagueofzero-da338-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const authFirebase = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

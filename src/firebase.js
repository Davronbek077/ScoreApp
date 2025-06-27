import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2L-OOJmCYiNZk3kou4pYQrmbuXico0W4",
  authDomain: "scoreapp-6be74.firebaseapp.com",
  projectId: "scoreapp-6be74",
  storageBucket: "scoreapp-6be74.appspot.com",
  messagingSenderId: "457484310548",
  appId: "1:457484310548:web:b9f3da26aa3f75fc286f01",
  databaseURL: "https://scoreapp-6be74-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

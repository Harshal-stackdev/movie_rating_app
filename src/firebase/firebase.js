
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAOjg5nV2UVZWMPs-Iifwv4AFMy-OKuLIA",
  authDomain: "movierate-15839.firebaseapp.com",
  projectId: "movierate-15839",
  storageBucket: "movierate-15839.appspot.com",
  messagingSenderId: "763543200553",
  appId: "1:763543200553:web:91dd5b1eb033a6c0c84d38"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewRef = collection(db, "reviews");

export default app;
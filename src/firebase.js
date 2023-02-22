// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGR8Fjomrjb5jdqAZou4jO5776yGl70eo",
  authDomain: "insta-clone-deae9.firebaseapp.com",
  projectId: "insta-clone-deae9",
  storageBucket: "insta-clone-deae9.appspot.com",
  messagingSenderId: "57039325745",
  appId: "1:57039325745:web:4c0e7b357351f1fa3b6310",
  measurementId: "G-E6QC1Y490Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const firebaseAuth = getAuth(app)
export const fireStore = getFirestore(app)
export const storage = getStorage(app)
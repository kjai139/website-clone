// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getFunctions} from 'firebase/functions'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpM_Di7Gr14Cq4TLvQxDD0CRDo2n7F1Tw",
  authDomain: "website-clone-a9665.firebaseapp.com",
  projectId: "website-clone-a9665",
  storageBucket: "website-clone-a9665.appspot.com",
  messagingSenderId: "783521231038",
  appId: "1:783521231038:web:c66eaf6b22a49184d76eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const functions = getFunctions(app)
export const firebaseAuth = getAuth(app)
export const fireStore = getFirestore(app)
export const storage = getStorage(app)
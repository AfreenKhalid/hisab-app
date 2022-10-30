
// import '@firebase/auth';
// import '@firebase/firestore';
// //import * as firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyDggcs-hqvrz7h3I9KdC5P0FBPylztlwcI",
//     authDomain: "hisab-calculator.firebaseapp.com",
//     projectId: "hisab-calculator",
//     storageBucket: "hisab-calculator.appspot.com",
//     messagingSenderId: "498467215431",
//     appId: "1:498467215431:web:d2448b20c0ff8bd2723962",
//     measurementId: "G-FDT2DCRG1S"
// };
// cosole.log(firebase);

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDggcs-hqvrz7h3I9KdC5P0FBPylztlwcI",
  authDomain: "hisab-calculator.firebaseapp.com",
  projectId: "hisab-calculator",
  storageBucket: "hisab-calculator.appspot.com",
  messagingSenderId: "498467215431",
  appId: "1:498467215431:web:d2448b20c0ff8bd2723962",
  measurementId: "G-FDT2DCRG1S"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addDoc, collection };
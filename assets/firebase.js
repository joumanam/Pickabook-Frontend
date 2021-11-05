import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDNLC7FOaZWsAnSyPHkohgj7cEh5s7wEw",
    authDomain: "pickabook-a52cd.firebaseapp.com",
    projectId: "pickabook-a52cd",
    storageBucket: "pickabook-a52cd.appspot.com",
    messagingSenderId: "889853719680",
    appId: "1:889853719680:web:278c53098b84e969166265",
    // measurementId: "G-PNM5Q4GLRT",
  };
  
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true});
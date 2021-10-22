import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCrF6kbF6sHJPmfLF1k5d2WVAWUfy0u060",
    authDomain: "react-journal-app-9d6aa.firebaseapp.com",
    projectId: "react-journal-app-9d6aa",
    storageBucket: "react-journal-app-9d6aa.appspot.com",
    messagingSenderId: "832414936487",
    appId: "1:832414936487:web:39b86f38d22c05acb15a82",
    measurementId: "G-VTHPW70WSZ"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig); // inicializa firebase con la config

const db = getFirestore(app); // firebase.firestore(); || devuelve la instancia configurada arriba

const googleAuthProvider = new GoogleAuthProvider(); // new.firebase.auth.GoogleAuthProvider()
// inicializa un authenticador de Google

export {
    db,
    googleAuthProvider    
}

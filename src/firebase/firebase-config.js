import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASURENEMTID
};

// const firebaseConfigTesting = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASURENEMTID
// };

// console.log( process.env ); // check environment

// if( process.env.NODE_ENV === 'test') {
//   // testing

//   initializeApp(firebaseConfigTesting);

// } else {
//   // dev/prod

//   initializeApp(firebaseConfig);
// }

  // Initialize Firebase
// const app = initializeApp(firebaseConfig); // inicializa firebase con la config
initializeApp(firebaseConfig); // inicializa firebase con la config

// const db = getFirestore(app); // firebase.firestore(); || devuelve la instancia configurada arriba
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider(); // new.firebase.auth.GoogleAuthProvider()
// inicializa un authenticador de Google

export {
    db,
    googleAuthProvider    
}

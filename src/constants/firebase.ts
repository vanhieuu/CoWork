import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCzeGqXNdvzLvG8gllLA1LAoR1WTA07Tgo",
    authDomain: "cowork-7a15a.firebaseapp.com",
    projectId: "cowork-7a15a",
    storageBucket: "cowork-7a15a.appspot.com",
    messagingSenderId: "825765687060",
    appId: "1:825765687060:web:c9ed728acaccf458fd1c01",
    measurementId: "G-08WFCRRNCB"
  };



export  const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
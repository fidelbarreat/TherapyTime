import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA3g9Mqr3RqDfss3kRs9k5l3lYSt4YtZik",
    authDomain: "therapytime-6e07f.firebaseapp.com",
    projectId: "therapytime-6e07f",
    storageBucket: "therapytime-6e07f.appspot.com",
    messagingSenderId: "424699513250",
    appId: "1:424699513250:web:2334124050fc9cd49bcafb",
    measurementId: "G-236N6Q05WQ" 
};

const app = initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export const st = app.storage();



export const googleProvider = new firebase.auth.GoogleAuthProvider();


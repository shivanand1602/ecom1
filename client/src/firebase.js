import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyATlRr30drvNRSR5sy0b0aiqoq4scskqrI",
    authDomain: "ecommerce-f550c.firebaseapp.com",
    projectId: "ecommerce-f550c",
    storageBucket: "ecommerce-f550c.appspot.com",
    messagingSenderId: "989598610292",
    appId: "1:989598610292:web:e6e90b30f460f6f2543221"
};

firebase.initializeApp(firebaseConfig);

//export
export const auth=firebase.auth()
export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();


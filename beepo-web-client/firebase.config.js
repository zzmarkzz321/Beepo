import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDcB_A5nEq7nDk_5N2e-vKR71nyo42vm4A",
    authDomain: "beepo-5df66.firebaseapp.com",
    databaseURL: "https://beepo-5df66.firebaseio.com",
    projectId: "beepo-5df66",
    storageBucket: "beepo-5df66.appspot.com",
    messagingSenderId: "52315911762"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();
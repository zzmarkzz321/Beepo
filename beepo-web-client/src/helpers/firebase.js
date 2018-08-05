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
const db = firebase.firestore();

const getTopXUsersAPI = (limit) => {
    return db.collection("userData").orderBy('points').limit(limit).get();
};

export const getTopFive = () => {
    return getTopXUsersAPI(5)
        .then((snapshot) => {
            let leaderDocs = [];
            snapshot.forEach((doc) => {
                leaderDocs.push(JSON.stringify(doc.data()));
            });
            return leaderDocs;
        })
        .catch(error => {
            console.log(error);
        })
};

const getHidingSpotAPI = () => {
    return db.collection('hidingSpot').get();
};

export const getBeepoHint = () => {
    return getHidingSpotAPI()
        .then(snapshot => {
            let hidingSpotId = '';
            snapshot.forEach(doc => {
                hidingSpotId = doc.id;
            });
            return db.collection('playground').doc(hidingSpotId).get();
        })
        .then(doc => {
            const docData = doc.data();
            return docData.hint;
        })
        .catch(error => {
            console.log(error);
        })
};
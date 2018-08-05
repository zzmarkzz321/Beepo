import {db} from '../firebase.config'

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
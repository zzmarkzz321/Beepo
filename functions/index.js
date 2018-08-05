const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// exports.deployBeepo = functions.pubsub.topic('twenty-five-minute-tick').onPublish((event) => {
//     // Get the current hidingSpot and push beepo to their channel
//     // Pushing beepo is simply a message to the client
//     const hidingSpotRef = db.collection('hidingSpot');
//
//     return hidingSpotRef.doc().get()
//         .then(snapshot => {
//             // Send the message to the client through the API.
//         })
//         .catch(error => {
//             console.error(error);
//         })
// });

/**
 * Returns a random song from UMG
 */
// const getRandomSong = () => {
//     return axios.create({
//         baseUrl: 'http://api.7digital.com/1.2/',
//         url: '/artist/browse',
//         params: {
//             shopId: '2020',
//             oauth_consumer_key: '7d4vr6cgb392',
//             letter: 'Drake',
//         },
//         method: 'get',
//         headers: {
//             accept: 'application/json',
//         },
//     });
// };
const getRandomSong = () => {
    return fetch('http://api.7digital.com/1.2/artist/browse?shopId=2020&oauth_consumer_key=7d4vr6cgb392&letter=Drake');
};

// Example request to 7digital:
// http://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&q=Michael%20Jackson&usageTypes=adsupportedstreaming
exports.findNewHidingSpot = functions.pubsub.topic('twenty-minute-tick').onPublish((event) => {
    // look in the playground and search for a new hiding spot
    // Place hiding spot in hidingSpot
    const playgroundRef = db.collection('playground');
    const hidingSpotRef = db.collection('hidingSpot');

    return hidingSpotRef.get()
        .then(snapshot => {
            // Delete the existing hiding spot
            let oldHidingSpot = '';
            snapshot.forEach(doc => {
                oldHidingSpot = doc.id;
            });
            console.log(oldHidingSpot);
            return hidingSpotRef.doc(oldHidingSpot).delete();
        })
        .then(() => {
            // Get all available playgrounds
            return playgroundRef.get();
        })
        .then(snapshot => {
            // Randomly choose a hiding spot and save it
            const activeStreamCount = snapshot.size;
            const randomStreamer = Math.floor(Math.random() * activeStreamCount);
            let hidingSpot = 'testId3';
            snapshot.forEach((doc, index) => {
                if (index === randomStreamer-1 || index === randomStreamer)  {
                    hidingSpot = doc.id;
                }
            });
            return hidingSpotRef.doc(hidingSpot).set({});
        })
        .catch(error => {
            console.error(error);
        });
});

exports.getUserSubmissions = functions.https.onRequest((req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Headers', '*')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .status(200);
        const participantId = req.body.userId;
        const songGuess = req.body.song;
        console.log(req.body);
        return res.status(201).send(songGuess, participantId);
    }
    catch(e) {
        console.error(e);
        return res.status(500).send('error');
    }
});

exports.testFindPlayground = functions.https.onRequest((req, res) => {
    // // const text = req.query.text;
    return axios.get('http://api.7digital.com/1.2/artist/browse?shopId=2020&oauth_consumer_key=7d4vr6cgb392&letter=Drake')
        .then(response => {
            console.log(response);
            return res.send('Nice! Found the song')
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send('error');
        })
    // look in the playground and search for a new hiding spot
    // Place hiding spot in hidingSpot
});


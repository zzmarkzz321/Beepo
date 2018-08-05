const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

/**
 * Starts a webhook subscription for a given streamer
 */
exports.subscribeToStreamerStatus = functions.https.onRequest((req, res) => {
    const userId = req.body.userId;
    axios.create({
        url: 'https://api.twitch.tv/helix/webhooks/hub',
        method: 'POST',
        data: {
            "hub.mode": "subscribe",
            "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${userId}`,
            "hub.callback": "https://us-central1-beepo-5df66.cloudfunctions.net/addToPlayGround",
            // "hub.secret": 's3cRe7'
        },
        headers: {
            'Client-ID': 'p9ifvvlcydmeft82whtbqha27zxas0',
            'Content-Type': 'application/json'
        }
    })
});

/**
 * Adds Streamer to the playground
 */
exports.toggleToPlayGround = functions.https.onRequest((req, res) => {
    const playground = req.body.data;
    playground.forEach(hidingSpot => {
        if (hidingSpot.type === 'live') {
            // add to the playground
            const playgroundRef = db.collection('playground');
            return playgroundRef.doc(hidingSpot.user_id).set()
                .then(() => {
                    console.log('success, removed streamer from playground');
                    return res.send('Success!');
                })
                .catch(error => {
                    console.log(`error removing streamer from playgroud`);
                    return res.status(500).send('Oops! Something went wrong.');
                })
        } else {
            // remove from playground
            return playgroundRef.doc(hidingSpot.user_id).delete()
                .then(() => {
                    console.log('success, removed streamer from playground');
                    return res.send('Success!');
                })
                .catch(error => {
                    console.log(`error removing streamer from playgroud`);
                    return res.status(500).send('Oops! Something went wrong.');
                })
        }
    })
});

/**
 * Deploys beepo to his designated hiding spot
 */
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

/**
 * Grabs a random song from the UMG 7 Digital API
 * @return {*}
 */
const getRandomSong = () => {
    return fetch('http://api.7digital.com/1.2/artist/browse?shopId=2020&oauth_consumer_key=7d4vr6cgb392&letter=Drake');
};

/**
 * Finds a new hiding spot for Beepo from the current playground
 * @type {CloudFunction<Message> | *}
 */
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
            console.log(randomStreamer);
            let hidingSpot = 'testId3';
            let iterator = 1;
            snapshot.forEach((doc) => {
                if (iterator === randomStreamer)  {
                    hidingSpot = doc.id;
                }
                iterator = iterator + 1;
            });
            return hidingSpotRef.doc(hidingSpot).set({});
        })
        .catch(error => {
            console.error(error);
        });
});

/**
 * Listens for user submissions to the jukebox challenge
 * @type {HttpsFunction}
 */
exports.getUserSubmissions = functions.https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);
    try {
        const participantId = req.body.userId;
        const songGuess = req.body.song;
        const hidingSpotRef = db.collection('hidingSpot');
        const submissionSent = new Date().getTime();
        return hidingSpotRef.get()
            .then(snapshot => {
                // Add user's input to the current hiding spots collection
                let currentHidingSpot = '';
                snapshot.forEach(doc => {
                    currentHidingSpot = doc.id;
                });
                console.log(`current hiding spot: ${currentHidingSpot}`);
                return hidingSpotRef.doc(currentHidingSpot).update({
                    [participantId]: {
                        songGuess,
                        submissionSent,
                    },
                })
            })
            .then(() => {
                return res.status(201).send(songGuess, participantId);
            })
            .catch(error => {
                console.error(error);
            })
    }
    catch(e) {
        console.error(e);
        return res.status(500).send('error');
    }
});

/**
 * Testing function
 * @type {HttpsFunction}
 */
exports.test= functions.https.onRequest((req, res) => {
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
            console.log(`random streamer ${randomStreamer}`);
            let hidingSpot = 'testId3';
            let iterator = 1;
            snapshot.forEach((doc) => {
                if (iterator === randomStreamer)  {
                    hidingSpot = doc.id;
                }
                iterator = iterator + 1;
            });
            return hidingSpotRef.doc(hidingSpot).set({});
        })
        .catch(error => {
            console.error(error);
        });
});


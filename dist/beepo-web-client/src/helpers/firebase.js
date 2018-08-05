'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBeepoHint = exports.getTopFive = undefined;

var _firebase = require('../firebase.config');

var getTopXUsersAPI = function getTopXUsersAPI(limit) {
    return _firebase.db.collection("userData").orderBy('points').limit(limit).get();
};

var getTopFive = exports.getTopFive = function getTopFive() {
    return getTopXUsersAPI(5).then(function (snapshot) {
        var leaderDocs = [];
        snapshot.forEach(function (doc) {
            leaderDocs.push(JSON.stringify(doc.data()));
        });
        return leaderDocs;
    }).catch(function (error) {
        console.log(error);
    });
};

var getHidingSpotAPI = function getHidingSpotAPI() {
    return _firebase.db.collection('hidingSpot').get();
};

var getBeepoHint = exports.getBeepoHint = function getBeepoHint() {
    return getHidingSpotAPI().then(function (snapshot) {
        var hidingSpotId = '';
        snapshot.forEach(function (doc) {
            hidingSpotId = doc.id;
        });
        return _firebase.db.collection('playground').doc(hidingSpotId).get();
    }).then(function (doc) {
        var docData = doc.data();
        return docData.hint;
    }).catch(function (error) {
        console.log(error);
    });
};
//# sourceMappingURL=firebase.js.map
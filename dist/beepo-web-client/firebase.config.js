'use strict';

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

require('firebase/firestore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    apiKey: "AIzaSyDcB_A5nEq7nDk_5N2e-vKR71nyo42vm4A",
    authDomain: "beepo-5df66.firebaseapp.com",
    databaseURL: "https://beepo-5df66.firebaseio.com",
    projectId: "beepo-5df66",
    storageBucket: "beepo-5df66.appspot.com",
    messagingSenderId: "52315911762"
};
_app2.default.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = _app2.default.firestore();
//# sourceMappingURL=firebase.config.js.map
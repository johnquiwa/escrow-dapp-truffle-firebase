const firebase = require('firebase');


// Initialize Firebase
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(config);

const removeKey = firePath =>
  firebase.database().ref(firePath).remove();

const createRef = firePath =>
  firebase.database().ref(firePath);

const removeRef = firePath =>
  firebase.database().ref(firePath).off()

const updateOrder = (firePath, newDataObj) => {
  Object.entries(newDataObj).forEach(([key, prop]) =>
    firebase.database().ref(`${firePath}/${key}`).set(prop)
  )
}

const database = firebase.database();

module.exports =  {
  database,
  removeKey,
  removeRef,
  createRef,
  updateOrder,
}

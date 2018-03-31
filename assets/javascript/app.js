$(document).ready(() => {
  Firebase Config
  var config = {
    apiKey: "AIzaSyBIxDWLxlf5c7pARWt5wL1LhhiODNA3LMY",
    authDomain: "synescribble.firebaseapp.com",
    databaseURL: "https://synescribble.firebaseio.com",
    projectId: "synescribble",
    storageBucket: "",
    messagingSenderId: "648660572319"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  console.log(database);
});
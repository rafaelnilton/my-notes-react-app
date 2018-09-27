import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const DB_CONFIG = {
    apiKey: "AIzaSyDQ4dUN_7LPPAC6z8MU5ASkSw_liRtIvLs",
    authDomain: "my-notes-24aec.firebaseapp.com",
    databaseURL: "https://my-notes-24aec.firebaseio.com",
    projectId: "my-notes-24aec",
    storageBucket: "my-notes-24aec.appspot.com",
    messagingSenderId: "277280856151"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(DB_CONFIG);
  }
  
  const db = firebase.database();
  const auth = firebase.auth();
  
  export {
    db,
    auth,
  };
import  * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ2kYLUQL11zNQW3s5u4Fd-C8I-n8UgR4",
    authDomain: "instaclone-react-cf624.firebaseapp.com",
    databaseURL: "https://instaclone-react-cf624.firebaseio.com",
    projectId: "instaclone-react-cf624",
    storageBucket: "instaclone-react-cf624.appspot.com",
    messagingSenderId: "317569075311",
    appId: "1:317569075311:web:fe4453a58dcae6c803259a",
    measurementId: "G-HBELNRVJPR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 


  //initialize firebase storage
  const projectStorage= firebase.storage();
  const projectDatabase= firebase.firestore();
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
  const projectAuth = firebase.auth();


  export {projectStorage, projectDatabase,timeStamp,projectAuth}; 
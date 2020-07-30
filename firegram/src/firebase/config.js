import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);

const storageService = firebase.storage();
const databaseService = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storageService, databaseService, timestamp };

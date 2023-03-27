import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBrbYkuuR5Pxp-NlVhzAH6dtmmcPbSDj_M',
  authDomain: 'gitflix-df858.firebaseapp.com',
  databaseURL:
    'https://gitflix-df858-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'gitflix-df858',
  storageBucket: 'gitflix-df858.appspot.com',
  messagingSenderId: '316511794032',
  appId: '1:316511794032:web:85f5fa341e7c5da9ea55b5',
  measurementId: 'G-MLRFFTEPF0',
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth, database };

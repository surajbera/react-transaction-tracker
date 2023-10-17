import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/* web app's Firebase configuration */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_apiKey,
  authDomain: import.meta.env.VITE_APP_authDomain,
  projectId: import.meta.env.VITE_APP_projectId,
  storageBucket: import.meta.env.VITE_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
  appId: import.meta.env.VITE_APP_appId,
};

/* Initialize Firebase */
const firebaseApp = initializeApp(firebaseConfig);

/* Initialize Service */
const projectDb = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);

export { projectDb, projectAuth };

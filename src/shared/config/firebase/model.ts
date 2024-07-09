import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0ljjE_PyGC96brNa513EOdkgYLRFmkcY',
  authDomain: 'petagecalculator.firebaseapp.com',
  projectId: 'petagecalculator',
  storageBucket: 'petagecalculator.appspot.com',
  messagingSenderId: '897342599798',
  appId: '1:897342599798:web:f1ba0e42b9280da2756557',
  measurementId: 'G-4F15FWY0PK',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

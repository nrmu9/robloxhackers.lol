import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCDDsvgiS_CBnmQGsu3H2vF1W2yta7Nysc",
    authDomain: "robloxhackers-lol.firebaseapp.com",
    projectId: "robloxhackers-lol",
    storageBucket: "robloxhackers-lol.appspot.com",
    messagingSenderId: "459378732635",
    appId: "1:459378732635:web:2e152859e16adfd872997e",
    measurementId: "G-815TJX7480"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };
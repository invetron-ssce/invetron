import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnV_eux4rYJXxZdWENRfZknNx7l65fmw8",
    authDomain: "invetron-c9439.firebaseapp.com",
    projectId: "invetron-c9439",
    storageBucket: "invetron-c9439.firebasestorage.app",
    messagingSenderId: "567752229060",
    appId: "1:567752229060:web:c7dea71ae70946aca9c991"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBwfUY8PQltbBVkbE4i9rLODg4OBm-bdnU",
  authDomain: "splitex-dev.firebaseapp.com",
  projectId: "splitex-dev",
  storageBucket: "splitex-dev.appspot.com",
  messagingSenderId: "131845473610",
  appId: "1:131845473610:web:81607f1082407cf933edb3",
  measurementId: "G-DBHP349MMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const authentication = getAuth(app)

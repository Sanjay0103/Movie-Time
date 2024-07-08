// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// import { getStorage } from "firebase/storage";

// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAkW39e8MDO7_OVcwtNDIz86hGEINSitNU",
//   authDomain: "movieapi-d7a33.firebaseapp.com",
//   projectId: "movieapi-d7a33",
//   storageBucket: "movieapi-d7a33.appspot.com",
//   messagingSenderId: "125886249894",
//   appId: "1:125886249894:web:d0dd974607f8a184a56d67",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD06PDZSfBDV8uEsvkV7LYWVx7IdjAGJig",
  authDomain: "movie-time-db.firebaseapp.com",
  projectId: "movie-time-db",
  storageBucket: "movie-time-db.appspot.com",
  messagingSenderId: "354392962851",
  appId: "1:354392962851:web:4c89a42dee690dc988be96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)


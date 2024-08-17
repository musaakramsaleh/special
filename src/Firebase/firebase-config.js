// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8WqVBMWygoBT0sRyfoeEituSqPNoD4c4",
  authDomain: "dummy-project-e80a8.firebaseapp.com",
  projectId: "dummy-project-e80a8",
  storageBucket: "dummy-project-e80a8.appspot.com",
  messagingSenderId: "33765725736",
  appId: "1:33765725736:web:97d6db142409d41501c71d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
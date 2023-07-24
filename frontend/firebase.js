// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpRtQrYubmtfQbdl7HdBo2t8oWmc0SzXY",
  authDomain: "restaurant-de3ba.firebaseapp.com",
  projectId: "restaurant-de3ba",
  storageBucket: "restaurant-de3ba.appspot.com",
  messagingSenderId: "551701518557",
  appId: "1:551701518557:web:e3785dcce5aea7e60d2334"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase;
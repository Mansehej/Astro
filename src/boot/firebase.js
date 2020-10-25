import * as firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";

import configFile from "../../firebaseConfig.json";

const firebaseConfig = process.env.FIREBASECONFIG ? JSON.parse(process.env.FIREBASECONFIG) : configFile

let firebaseApp;
let firebaseFunctions;
let firebaseAuth;

try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseFunctions = firebaseApp.functions("europe-west1");
  firebaseAuth = firebaseApp.auth();
} catch (error) {
  console.error(error);
}

export { firebaseFunctions, firebaseAuth };

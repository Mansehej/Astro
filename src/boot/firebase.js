import * as firebase from "firebase/app";
import "firebase/functions";

import configFile from "../../firebaseConfig.json";

const firebaseConfig = process.env.FIREBASECONFIG ? JSON.parse(process.env.FIREBASECONFIG) : configFile

let firebaseApp;
let firebaseFunctions;

try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseFunctions = firebaseApp.functions();
} catch (error) {
  console.error(error);
}

export { firebaseFunctions };

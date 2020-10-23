<template>
  <q-btn dense padding="none" class="q-mx-md" flat @click="googleLogin()">
    <img src="../assets/googlelogin.png" />
  </q-btn>
</template>

<script>
import { firebaseAuth } from "boot/firebase";
import * as firebase from "firebase/app";

export default {
  methods: {
    googleLogin() {
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      firebaseAuth.signInWithPopup(provider).catch((error) => {});
    },
  },
};
</script>

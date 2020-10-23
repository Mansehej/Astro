<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      outlined
      v-model="formData.name"
      label="Name"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.email"
      type="email"
      label="Email"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="formData.password"
      type="password"
      label="Password"
    />
    <div class="text-negative text-center">{{ formData.errorText }}</div>
    <br />
    <div class="row justify-center">
      <q-btn
        rounded
        class="q-px-md"
        color="primary"
        type="submit"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script>
import { firebaseAuth } from "boot/firebase";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        errorText: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.tab == "login") {
        this.login();
      } else if (this.tab == "register") {
        this.signUp();
      }
    },
    login() {
      firebaseAuth
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .catch((error) => {
          if (error.code == "auth/user-not-found") {
            this.formData.errorText = "User does not exist!";
          } else if (error.code == "auth/wrong-password") {
            this.formData.errorText = "Incorrect password!";
          }
        });
    },
    signUp() {
      firebaseAuth
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then((response) => {
          response.user.updateProfile({
            displayName: this.formData.name,
          });
        })
        .catch((error) => {
          this.formData.errorText = error.message;
        });
    },
  },
};
</script>

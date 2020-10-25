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
        class="q-px-md"
        color="primary"
        type="submit"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

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
    ...mapActions("user", ["registerUser", "loginUser"]),
    async submitForm() {
      if (this.tab == "login") {
        const loginResponse = await this.loginUser(this.formData);
        if (!loginResponse.success) {
          this.formData.errorText = loginResponse.message;
        }
      } else if (this.tab == "register") {
        const registerResponse = await this.registerUser(this.formData);
        if (!registerResponse.success) {
          this.formData.errorText = registerResponse.message;
        }
      }
    },
  },
};
</script>

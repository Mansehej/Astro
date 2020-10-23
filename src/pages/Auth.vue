<template>
  <q-page class="flex flex-center">
    <q-card class="rounded-borders">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 text-capitalize">{{ tab }}</div>
      </q-card-section>

      <q-separator inset />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>

      <q-separator inset />
      <div
        style="margin-top: 1vh"
        class="text-subtitle text-center text-weight-light v"
        v-if="tab == 'login'"
      >
        Don't have an account?
      </div>
      <div
        style="margin-top: 1vh"
        class="text-subtitle text-center text-weight-light v"
        v-if="tab == 'register'"
      >
        Already have an account?
      </div>
      <q-tabs
        v-model="tab"
        dense
        class="bg-white-3 text-info"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" v-if="tab == 'register'" />
        <q-tab name="register" label="Register" v-if="tab == 'login'" />
      </q-tabs>
      <q-card-section align="center">
        <google-login />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "login",
    };
  },
  components: {
    "login-register": require("../components/LoginRegister.vue").default,
    "google-login": require("../components/GoogleLogin.vue").default,
  },
};
</script>

<style></style>

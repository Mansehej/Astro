<template>
  <q-page class="flex flex-center">
    <q-card class="rounded-borders bg-black">
      <q-card-section>
        <h2 class="text-center text-capitalize q-mb-sm">{{ tab }}</h2>
      </q-card-section>

      <q-separator inset />

      <q-tab-panels v-model="tab" animated class="bg-black">
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

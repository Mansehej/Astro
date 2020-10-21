<template>
  <q-page class="flex flex-center">
    <div v-if="loaded" style="min-width: 30vw;">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Browse</q-toolbar-title>
      </q-toolbar>
      <asteroid-list :asteroidList="asteroidList" />
    </div>
    <div v-if="error" class="text-red text-bold text-center">
        There was an error. Please try again later.
    </div>
  </q-page>
</template>

<script>
import { firebaseFunctions } from "boot/firebase";

export default {
  name: "BrowsePage",
  components: {
    "asteroid-list": require("../components/AsteroidList.vue").default,
  },
  data() {
    return {
      loaded: false,
      asteroidList: [],
      error: false
    };
  },
  created() {
    const vm = this;
    const browseFunction = firebaseFunctions.httpsCallable("browse");
    browseFunction({})
      .then(function (result) {
        vm.asteroidList = result.data;
        vm.loaded = true;
      })
      .catch((error) => {
        this.error = true;
      });
  },
};
</script>
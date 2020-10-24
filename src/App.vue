<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["handleAuthStateChanged"]),
  },
  async mounted() {
    await this.handleAuthStateChanged();
  },
};
</script>

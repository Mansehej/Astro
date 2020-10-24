<template>
  <q-page class="flex flex-center">
    <div class="column">
      <h2>Asteronomy</h2>
      <asteroid-search />
      <div class="tex-subtitle text-center">OR</div>
      <div class="row justify-center q-mt-md">
        <q-btn color="primary" class="q-ma-sm" @click="browseAsteroids(null)">Browse</q-btn>
        <q-btn color="primary" class="q-ma-sm" @click="datePopup = true">Browse by date</q-btn>
      </div>
      <q-btn color="red" v-if="userDetails.uid" to="/favorites" class="q-mt-md"
        >Favorites</q-btn
      >
    </div>
    <q-dialog v-model="datePopup">
      <date-range-picker @range-picked="browseAsteroids" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PageIndex",
  components: {
    "asteroid-search": require("../components/AsteroidSearch.vue").default,
    "date-range-picker": require("../components/DateRangePicker.vue").default,
  },
  data() {
    return {
      asteroidId: "",
      asteroidInformation: null,
      isResultGenerated: false,
      datePopup: false,
      error: null,
    };
  },
  computed: {
    ...mapState("user", ["userDetails"]),
  },
  methods: {
    browseAsteroids(dateRange) {
      dateRange = dateRange ?? {};
      this.$router.push({ path: "browse", query: dateRange }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

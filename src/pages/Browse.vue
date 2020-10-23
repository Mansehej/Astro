<template>
  <q-page class="flex flex-center">
    <div v-if="loaded" style="min-width: 30vw">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Browse</q-toolbar-title>
      </q-toolbar>
      <asteroid-list :asteroidList="asteroidList" />
    </div>
    <div v-if="error" class="text-red text-bold text-center">
      {{ errorMessage }}
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
      error: false,
      errorMessage: "There was an error. Please try again later.",
    };
  },
  created() {
    const query = this.$route.query;
    if (!query.from || !query.to) {
      this.populateFromBrowse();
    } else {
      this.populateFromDateRange(query.from, query.to);
    }
  },
  methods: {
    populateFromBrowse() {
      const vm = this;
      const browseFunction = firebaseFunctions.httpsCallable("browse");
      browseFunction({})
        .then(function (result) {
          vm.asteroidList = result.data;
          vm.loaded = true;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = "There was an error. Please try again later.";
        });
    },
    populateFromDateRange(startDate, endDate) {
      const vm = this;
      const dateFunction = firebaseFunctions.httpsCallable("dateRange");
      const dateDifference = this.calculateDateDifference(startDate, endDate);
      if (dateDifference > 7) {
        this.errorMessage = "Dates cannot be more than 7 days apart.";
        this.error = true;
        return;
      }
      dateFunction({ startDate, endDate })
        .then(function (result) {
          vm.asteroidList = result.data;
          vm.loaded = true;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = "There was an error. Please try again later.";
        });
    },
    calculateDateDifference(startDate, endDate) {
      const MS_PER_DAY = 1000 * 60 * 60 * 24;

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      const utc1 = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const utc2 = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );

      return Math.floor((utc2 - utc1) / MS_PER_DAY) + 1;
    },
  },
};
</script>
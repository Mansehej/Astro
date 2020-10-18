<template>
  <q-page class="flex flex-center">
    <q-input
      standout="bg-teal text-white"
      v-model="asteroidId"
      label="Search Asteroid ID"
      bottom-slots
      :error="!!error"
      :error-message="error"
    >
      <template v-slot:append>
        <q-btn flat @click="searchAsteroid"
          ><q-icon clickable name="search"
        /></q-btn>
      </template>
    </q-input>

    <q-dialog v-model="isResultGenerated">
      <asteroid-card
        v-if="isResultGenerated"
        :name="asteroidInformation.name"
        :id="asteroidInformation.id"
        :estimatedDiameter="asteroidInformation.estimated_diameter"
        :closeApproachData="asteroidInformation.close_approach_data"
        :isPotentiallyHazardous="asteroidInformation.is_potentially_hazardous"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { firebaseFunctions } from "boot/firebase";

export default {
  name: "PageIndex",
  components: {
    "asteroid-card": require("../components/AsteroidInformation.vue").default,
  },
  data() {
    return {
      asteroidId: "",
      asteroidInformation: null,
      isResultGenerated: false,
      error: null,
    };
  },
  methods: {
    searchAsteroid() {
      const vm = this;
      if (this.asteroidId == "") {
        this.error = "Please enter asteroid ID";
        return;
      }
      var searchFunction = firebaseFunctions.httpsCallable("searchById");
      searchFunction({ id: this.asteroidId })
        .then(function (result) {
          vm.asteroidInformation = result.data[0];
          vm.isResultGenerated = true;
        })
        .catch((error) => {
          if (error.code == "not-found") {
            this.error = "Asteroid ID not found";
          }
        });
    },
  },
};
</script>

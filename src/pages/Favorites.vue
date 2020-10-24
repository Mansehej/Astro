<template>
  <q-page class="flex flex-center" v-if="loaded">
    <div style="min-width: 30vw" v-if="!!userDetails.uid">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Favorites</q-toolbar-title>
      </q-toolbar>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="(asteroid, index) in asteroidList"
          :key="index"
        >
          <q-item-section @click="openAsteroidInformation(index)">
            <q-item-label>ID: {{ asteroid }}</q-item-label>
          </q-item-section>

          <q-item-section
            avatar
            @click="deleteFavorite(index)"
            v-if="userDetails.name"
          >
            <q-icon color="red" name="delete" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      Login to save favorites
      <q-btn>Login</q-btn>
    </div>

    <q-dialog v-model="isAsteroidSelected">
      <asteroid-card
        v-if="selectedAsteroid"
        :name="selectedAsteroid.name"
        :id="selectedAsteroid.id"
        :estimatedDiameter="selectedAsteroid.estimated_diameter"
        :closeApproachData="selectedAsteroid.close_approach_data"
        :isPotentiallyHazardous="selectedAsteroid.is_potentially_hazardous"
        @unfavorited="deleteFavorite(selectedAsteroid.index)"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { firebaseFunctions } from "../boot/firebase";

export default {
  components: {
    "asteroid-card": require("../components/AsteroidInformation.vue").default,
  },
  data() {
    return {
      asteroidList: [],
      selectedAsteroid: null,
      isAsteroidSelected: false,
      loaded: false,
    };
  },
  computed: {
    ...mapState("user", ["userDetails", "favorites"]),
  },
  created() {
    for (const [key, value] of Object.entries(this.favorites)) {
      if (value === true) {
        this.asteroidList.push(key);
      }
    }
    this.loaded = true;
  },
  methods: {
    ...mapActions("user", ["removeFavorite"]),
    openAsteroidInformation(index) {
      const asteroidId = this.asteroidList[index];
      const vm = this;
      if (asteroidId == "") {
        return;
      }
      var searchFunction = firebaseFunctions.httpsCallable("searchById");
      searchFunction({ id: asteroidId })
        .then(function (result) {
          vm.selectedAsteroid = result.data[0];
          vm.selectedAsteroid.index = index;
          vm.isAsteroidSelected = true;
        })
        .catch((error) => {
          return;
        });
    },
    deleteFavorite(index) {
      this.removeFavorite({ asteroidId: this.asteroidList[index] });
      this.$delete(this.asteroidList, index);
    },
  },
};
</script>
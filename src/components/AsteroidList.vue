<template>
  <div v-if="loaded">
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="(asteroid, index) in asteroidList"
        :key="asteroid.id"
        @click="openAsteroidInformation(index)"
      >
        <q-item-section>
          <q-item-label>{{ asteroid.name }}</q-item-label>
          <q-item-label caption>ID: {{ asteroid.id }}</q-item-label>
        </q-item-section>

        <q-item-section avatar v-if="userDetails.name">
          <q-icon v-if="asteroid.isFavorite" color="red" name="favorite" />
          <q-icon v-else color="red" name="favorite_border" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="isAsteroidSelected">
      <asteroid-card
        v-if="selectedAsteroid"
        :name="selectedAsteroid.name"
        :id="selectedAsteroid.id"
        :estimatedDiameter="selectedAsteroid.estimated_diameter"
        :closeApproachData="selectedAsteroid.close_approach_data"
        :isPotentiallyHazardous="selectedAsteroid.is_potentially_hazardous"
      />
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    asteroidList: Array,
    
  },
  data() {
      return {
      selectedAsteroid: null,
    isAsteroidSelected: false,
      loaded: true
      }
  },
  computed: {
    ...mapState('user', ['userDetails'])
  },
  async created() {
    const favoritesMap = await this.getFavorites();
    this.asteroidList.forEach(asteroid => {
      if(favoritesMap[asteroid.id] === true) {
        asteroid.isFavorite = true;
      }
    })
    this.loaded = true;
  },
  components: {
    "asteroid-card": require("./AsteroidInformation.vue").default,
  },
  methods: {
    ...mapActions('user', ['getFavorites']),
      openAsteroidInformation(index) {
          this.selectedAsteroid = this.asteroidList[index];
          this.isAsteroidSelected = true;
      }
  }
};
</script>
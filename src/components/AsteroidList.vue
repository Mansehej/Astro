<template>
  <div>
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
export default {
  props: {
    asteroidList: Array,
    
  },
  data() {
      return {
      selectedAsteroid: null,
    isAsteroidSelected: false
      }
  },
  components: {
    "asteroid-card": require("./AsteroidInformation.vue").default,
  },
  methods: {
      openAsteroidInformation(index) {
          this.selectedAsteroid = this.asteroidList[index];
          this.isAsteroidSelected = true;
      }
  }
};
</script>
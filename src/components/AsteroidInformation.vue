<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <div class="column items-center">
        <div class="text-overline">Asteroid ID {{ id }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ name }}</div>
        <div
          class="text-caption text-capitalize"
          :class="{
            'text-red': isPotentiallyHazardous,
            'text-green': !isPotentiallyHazardous,
          }"
        >
          {{ computedHazardousMessage }}
        </div>
      </div>
    </q-card-section>

    <q-card-section @click="favoriteHandler" v-if="userDetails.name">
      <div class="column items-center">
        <q-icon v-if="isFavorite" size="lg" color="red" name="favorite" />
        <q-icon v-else color="red" size="lg" name="favorite_border" />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="column items-center text-capitalize">
        <div class="text-bold">Estimated Diameter</div>
        <div>
          {{ estimatedDiameter[units.diameter].estimated_diameter_min }}
          {{ units.diameter }} -
          {{ estimatedDiameter[units.diameter].estimated_diameter_max }}
          {{ units.diameter }}
        </div>
        <q-tabs
          v-model="units.diameter"
          no-caps
          indicator-color="transparent"
          active-color="black"
          class="text-grey-6"
        >
          <q-tab name="kilometers" label="Kilometers" />
          <q-tab name="meters" label="Meters" />
          <q-tab name="miles" label="Miles" />
          <q-tab name="feet" label="Feet" />
        </q-tabs>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="column" v-if="closeApproachData.length>0">
        <div class="text-bold text-center">Close Approaches</div>
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              v-for="(closeApproach, index) in closeApproachData"
              :key="index"
              expand-separator
              :label="closeApproach.close_approach_date_full.split(' ')[0]"
              :caption="closeApproach.close_approach_date_full.split(' ')[1]"
            >
              <q-card>
                <q-card-section>
                  <div class="column items-center text-capitalize">
                    <div class="text-bold">Relative Velocity</div>
                    <div>
                      {{ closeApproach.relative_velocity[units.velocity] }}
                      {{ units.velocity.replace(new RegExp("_", "g"), " ") }}
                    </div>
                    <q-tabs
                      v-model="units.velocity"
                      no-caps
                      indicator-color="transparent"
                      active-color="black"
                      class="text-grey-6"
                    >
                      <q-tab
                        name="kilometers_per_second"
                        label="Kilometers Per Second"
                      />
                      <q-tab
                        name="kilometers_per_hour"
                        label="Kilometers Per Hour"
                      />
                      <q-tab name="miles_per_hour" label="Miles Per Hour" />
                    </q-tabs>
                  </div>
                </q-card-section>
              </q-card>

              <q-card>
                <q-card-section>
                  <div class="column items-center text-capitalize">
                    <div class="text-bold">Miss Distance</div>
                    <div>
                      {{ closeApproach.miss_distance[units.distance] }}
                      {{ units.distance }}
                    </div>
                    <q-tabs
                      v-model="units.distance"
                      no-caps
                      indicator-color="transparent"
                      active-color="black"
                      class="text-grey-6"
                    >
                      <q-tab name="astronomical" label="Astronomical" />
                      <q-tab name="lunar" label="Lunar" />
                      <q-tab name="kilometers" label="Kilometers" />
                      <q-tab name="miles" label="Miles" />
                    </q-tabs>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
      </div>
      <div v-else class="text-red text-bold text-center">Close approach data unavailable</div>
    </q-card-section>
  </q-card>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  props: {
    name: String,
    id: String,
    estimatedDiameter: Object,
    closeApproachData: Array,
    isPotentiallyHazardous: Boolean,
  },
  data() {
    return {
      units: {
        diameter: "kilometers",
        velocity: "kilometers_per_second",
        distance: "kilometers",
      },
      isFavorite: false
    };
  },
  async created() {
    const favoritesMap = this.favorites
    if(favoritesMap[this.id] === true) {
      this.isFavorite = true;
    }
    this.loaded = true;
  },
  computed: {
    ...mapState('user', ['userDetails', 'favorites']),
    computedHazardousMessage() {
      const hazardousMessage = "potentially hazardous asteroid";
      return this.isPotentiallyHazardous
        ? hazardousMessage
        : "non-" + hazardousMessage;
    },
  },
  methods: {
    ...mapActions('user', ['addFavorite', 'removeFavorite']),
    favoriteHandler() {
        if (!this.isFavorite) {
          this.isFavorite = true;
          this.addFavorite({ asteroidId: this.id })
          this.$emit("favorited")
        }
        else {
          this.isFavorite = false;
          this.removeFavorite({ asteroidId: this.id })
          this.$emit("unfavorited")
        }
      }
  }
};
</script>
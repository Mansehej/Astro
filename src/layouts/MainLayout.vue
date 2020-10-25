<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" to="/">
          <q-icon :name="logo" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Astroneomy
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat v-if="userDetails.uid">
            <q-avatar v-if="userDetails.photo" size="26px">
              <img :src="userDetails.photo" />
            </q-avatar>
            <q-icon v-else size="26px" name="face"/>
            <q-menu>
              <div class="row no-wrap q-pa-sm">
                <div class="column justify-center">
                  <q-btn
                    class="q-ma-sm"
                    v-close-popup
                    label="Favorites"
                    to="/favorites"
                  />
                  <q-btn
                    class="q-ma-sm"
                    v-close-popup
                    label="Logout"
                    color="red"
                    @click="logoutUser"
                  />
                </div>

                <q-separator vertical inset class="q-mx-sm" />

                <div class="column items-center">
                  <q-avatar v-if="userDetails.photo" size="72px">
                    <img :src="userDetails.photo" />
                  </q-avatar>

                  <q-icon v-else size="72px" name="face"/>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ userDetails.name }}
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn v-else to="/auth"> Login </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-dark"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item> <asteroid-search :dense="true" /></q-item>
          <q-item
            v-for="link in links"
            :key="link.text"
            v-ripple
            clickable
            @click="link.onClick"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="datePopup">
      <date-range-picker @range-picked="browseAsteroids" />
    </q-dialog>

    <q-page-container>
      <router-view class="bg-black"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  components: {
    "asteroid-search": require("../components/AsteroidSearch.vue").default,
    "date-range-picker": require("../components/DateRangePicker.vue").default,
  },
  data() {
    const vm = this;
    return {
      leftDrawerOpen: false,
      datePopup: false,
      links: [
        {
          title: "Browse",
          icon: "public",
          onClick() {
            vm.browseAsteroids(null);
          },
        },
        {
          title: "Browse by date",
          icon: "date_range",
          onClick() {
            vm.datePopup = true;
          },
        },
      ],
      logo: null,
    };
  },
  computed: {
    ...mapState("user", ["userDetails"]),
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    browseAsteroids(dateRange) {
      dateRange = dateRange ?? {};
      this.$router.push({ path: "browse", query: dateRange }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

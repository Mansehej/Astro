<template>
  <q-date
    v-model="dateRange"
    range
    mask="YYYY-MM-DD"
    :options="acceptableRange"
    @range-start="getAcceptableRange"
    @input="handleRangeDeselect"
  >
    <div class="row items-center justify-end q-gutter-sm">
      <q-btn label="Cancel" color="primary" flat v-close-popup />
      <q-btn
        label="OK"
        color="primary"
        flat
        @click="emitDateRange"
        v-close-popup
      />
    </div>
  </q-date>
</template>

<script>
const defaultAcceptableRange = (date) => true;

export default {
  data() {
    return {
      dateRange: null,
      acceptableRange: defaultAcceptableRange,
    };
  },
  methods: {
    getAcceptableRange(from) {
      var result = [];
      const fromDateString = this.getDateString(from);
      for (var i = 0; i < 7; i++) {
        var d = new Date(fromDateString);
        d.setDate(d.getDate() - i);
        result.push(this.getParsedDate(d));
      }
      for (var i = 1; i < 7; i++) {
        var d = new Date(fromDateString);
        d.setDate(d.getDate() + i);
        result.push(this.getParsedDate(d));
      }
      this.acceptableRange = result;
    },

    getParsedDate(date) {
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      (mm = (mm > 9 ? "" : "0") + mm), (dd = (dd > 9 ? "" : "0") + dd);
      return `${yyyy}/${mm}/${dd}`;
    },

    getDateString(dateMap) {
      return `${dateMap.year}-${dateMap.month}-${dateMap.day}`;
    },

    handleRangeDeselect(value, reason, details) {
      if (reason == "remove-range") {
        this.acceptableRange = defaultAcceptableRange;
      }
    },

    emitDateRange() {
      this.$emit("range-picked", this.dateRange);
    },
  },
};
</script>
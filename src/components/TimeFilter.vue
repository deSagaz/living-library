<template>
  <div class="timeslider-container">
    <h3 id="timeslider-caption">Flow of time &#8594;</h3>

    <vue-slider
      v-model="sliderValue"
      direction="btt"
      :max="maxDateUnixTimeSlider"
      :min="minDateUnixTimeSlider"
      :marks="getMonthMarkers(minDateUnixTimeSlider, maxDateUnixTimeSlider)"
      :enable-cross="false"
      :tooltip-formatter="sliderFormatter"
      :adsorb="true"
      :hideLabel="true"
      tooltip-placement="right"
      tooltip="always"
      @drag-start="onStartDraggingTimeFilter"
      @drag-end="onStopDraggingTimeFilter"
      v-on:change="onSliderChange($event)"
    >
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import { mapMutations } from "vuex";
import "vue-slider-component/theme/default.css";
import moment from "moment";

export default {
  name: "TimeFilter",
  mixins: [],
  components: { VueSlider },
  data() {
    return {
      minDateUnixTimeSlider: moment("2020-01-01").unix(),
      maxDateUnixTimeSlider: this.getMaxSliderValue(),
      sliderValue: [moment("2020-01-01").unix(), this.getMaxSliderValue()],
      sliderFormatter: (unix) => moment.unix(unix).format("MMMM YYYY"),
    };
  },
  methods: {
    ...mapMutations({
      updateTimeFilter: "timeFilter/update",
      onStartDraggingTimeFilter: "timeFilter/onStartDraggingTimeFilter",
      onStopDraggingTimeFilter: "timeFilter/onStopDraggingTimeFilter",
    }),
    onSliderChange(event) {
      this.updateTimeFilter({
        min: this.sliderValue[0],
        max: this.sliderValue[1],
      });
    },
    getMonthMarkers(startDateUnix, endDateUnix) {
      startDateUnix = moment.unix(startDateUnix);
      endDateUnix = moment.unix(endDateUnix);

      const markers = [];

      if (endDateUnix.isBefore(startDateUnix)) {
        throw "End date must be greater than start date.";
      }

      while (startDateUnix.isBefore(endDateUnix)) {
        markers.push(startDateUnix.unix());
        startDateUnix.add(1, "month");
      }
      return markers;
    },
    getMaxSliderValue() {
      return moment()
        .add(1, "months")
        .set("date", 1)
        .set({ hour: 0, minute: 0, second: 0 })
        .unix();
    },
  },
  mounted() {
    this.updateTimeFilter({
      min: this.minDateUnixTimeSlider,
      max: this.maxDateUnixTimeSlider,
    });
  },
};
</script>

<style>
.vue-slider {
  height: 100% !important;
}

.vue-slider-dot-tooltip-inner {
  background-color: rgba(52, 152, 219, 0.75) !important;
  border-color: rgba(52, 152, 219, 0.75) !important;
}

.timeslider-container {
  padding-left: 10px;
  height: 100%;
}
ion-row, ion-col {
  height: 100%;

}
#timeslider-caption {
  position: absolute;
  top: 35vh;
  left: 7px;
  transform-origin: 0;
  transform: rotate(-90deg);
  width: 300px;
  font-size: 1em;
}
</style>

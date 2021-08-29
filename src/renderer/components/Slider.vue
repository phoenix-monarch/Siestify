<template>
  <vue-slider v-bind="options" @change="onChange" />
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  props: ["width", "max"],
  components: {
    VueSlider,
  },
  data() {
    return {
      value: 0,
      options: {
        max: this.max,
        railStyle: {
          backgroundColor: "#333949",
          width: this.width,
        },
        processStyle: {
          backgroundColor: "#677486",
        },
        dotOptions: {
          tooltip: "none",
        },

        dotSize: 11,
      },
    };
  },
  methods: {
    onChange(num) {
      this.$emit("change", num);
    },
  },
};
</script>

<style lang="scss">
/deep/ .vue-slider {
  cursor: pointer;
  &:hover .vue-slider-dot-handle {
    visibility: visible;
  }
}

/deep/ .vue-slider-dot-handle {
  visibility: hidden;
}
</style>
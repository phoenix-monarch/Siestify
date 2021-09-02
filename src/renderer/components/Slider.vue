<template>
  <vue-slider
    ref="slider"
    v-bind="options"
    :value="value"
    :max="max"
    :interval="interval"
    @change="onChange"
    @drag-end="onDragEnd"
    @click.native="onClick"
  />
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  props: {
    value: {
      default: 0,
      type: Number,
    },
    width: {
      type: String,
    },
    max: {
      default: 100,
      type: Number,
    },
    interval: {
      default: 1,
      type: Number,
    },
  },
  components: {
    VueSlider,
  },
  data() {
    return {
      lastDragValue: 0,
      options: {
        speed: 0,
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
        min: 0,
      },
    };
  },
  methods: {
    onChange(num) {
      this.lastDragValue = num;
      this.$emit("change", num);
    },
    onDragEnd() {
      this.$emit("drag-end", this.lastDragValue);
    },

    onClick() {
      this.$emit("click", this.lastDragValue);
    },
  },
};
</script>

<style lang="scss">
.vue-slider {
  cursor: pointer;
  &:hover .vue-slider-dot-handle {
    visibility: visible;
  }
}

.vue-slider-dot-handle {
  visibility: hidden;
}

.vue-slider-dot {
  transition: none !important;
}
</style>
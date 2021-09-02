<template>
  <popper trigger="hover" :options="options">
    <div class="popper popper__content">
      <slot v-if="!disabled" />
    </div>

    <slot name="reference" slot="reference" />
  </popper>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  props: {
    placement: {
      default: "top",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    Popper,
  },
  data() {
    return {
      options: {
        placement: this.placement,
        modifiers: { offset: { offset: "0,10px" } },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$background-color: black;

.popper__content {
  background-color: $background-color;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

/deep/ .popper {
  min-width: min-content !important;
  border: 1px solid $background-color;

  &[x-placement^="top"] .popper__arrow {
    border-color: $background-color transparent transparent transparent;
  }
  &[x-placement^="bottom"] .popper__arrow {
    border-color: transparent transparent $background-color transparent;
  }
  &[x-placement^="right"] .popper__arrow {
    border-color: transparent transparent $background-color transparent;
  }
  &[x-placement^="left"] .popper__arrow {
    border-color: transparent transparent transparent $background-color;
  }
}
</style>
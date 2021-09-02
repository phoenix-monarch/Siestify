<template>
  <button
    @click="onClick"
    class="button-icon"
    :class="{ disabled, active, circle }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["disabled", "active", "circle"],
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.button-icon {
  display: inline-block;

  &.disabled {
    color: $text-secondary-color;

    cursor: no-drop;
  }

  &.circle {
    padding: 0.5rem;
    padding-bottom: 0.25rem;
    border-radius: 50%;
    transition: background-color 300ms;

    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.2);
    }
  }

  &.active {
    color: $primary-color;
  }
}
</style>
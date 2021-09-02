<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["variant"],
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

button {
  $opacity: 0.8;
  $bg-color: $background-color;

  cursor: pointer;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  color: white;
  background-color: rgba($color: $bg-color, $alpha: $opacity);

  &:hover {
    $opacity: 1;

    background-color: rgba($color: $bg-color, $alpha: $opacity);
  }
}
</style>
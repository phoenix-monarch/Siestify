<template>
  <div class="drawer" :class="{ active }">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["active"],
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.drawer {
  z-index: 1;
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  transform: translateX(100%);
  transition: transform 1s;
  min-width: 16rem;
  background-color: $background-color-darker;

  &.active {
    transform: translateX(0px);
  }
}
</style>
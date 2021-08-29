<template>
  <div class="text-icon" :class="{ active: isActive }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "text-icon",
  props: ["color", "isActive"],
  style() {
    return {
      color: this.color,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.text-icon {
  display: flex;
  align-items: center;
  transition: color 300ms;

  &.active {
    border-left: 2px solid $primary-color;
    padding-left: 0.5rem;
  }

  & > * + * {
    margin-left: 0.2rem;
  }

  &:hover {
    color: $text-color;
  }
}
</style>
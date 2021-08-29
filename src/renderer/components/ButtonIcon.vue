<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style>
</style>
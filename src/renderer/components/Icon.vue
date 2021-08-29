<template>
  <unicon
    :name="name"
    :width="width"
    :height="height"
    color="currentColor"
    fill="currentColor"
    :style="style"
    class="icon"
  />
</template>

<script>
export default {
  name: "icon",
  props: ["name", "width", "height"],
  computed: {
    style() {
      return `height: ${this.height};`;
    },
  },
};
</script>

<style >
</style>
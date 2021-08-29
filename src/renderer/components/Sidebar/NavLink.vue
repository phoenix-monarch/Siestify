<template>
  <router-link :to="to" class="nav-link">
    <slot> </slot>
  </router-link>
</template>

<script>
export default {
  name: "nav-link",
  props: ["to"],
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-link {
  display: block;
}
</style>
<template>
  <div class="main">
    <div v-for="item in data" :key="item.encodeId">
      <main-carousel v-bind="item" />
    </div>
  </div>
</template>

<script>
import data from "../../data/carousel.json";
import MainCarousel from "../../components/MainCarousel.vue";

export default {
  data() {
    return {
      data,
    };
  },
  mounted() {
    // console.log(this.$route);
  },
  components: {
    MainCarousel,
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 3rem;
  margin-left: 2rem;
  margin-right: 2rem;

  & > * + * {
    margin-top: 1.5rem;
  }
}
</style>
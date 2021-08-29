<template>
  <div class="sidebar">
    <div class="sidebar__nav">
      <main-nav />
      <!-- <second-nav /> -->
    </div>

    <div class="sidebar__player">
      <img
        src="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/e/0/6/2e0631a7eba6ecbd60540290646b0775.jpg"
        alt="player-image"
        class="sidebar__player--image"
      />
    </div>
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
import SecondNav from "./SecondNav.vue";

export default {
  name: "sidebar",
  data() {
    return {};
  },
  components: {
    MainNav,
    SecondNav,
  },
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.sidebar {
  position: relative;
  grid-column: span 2 / span 2;
  padding: 5.5rem 1.5rem;
  color: $text-grayish-color;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 9rem;

  &__nav > * + * {
    margin-top: 1.5rem;
  }

  &__player {
    max-width: 8rem;
    &--image {
      aspect-ratio: 1 / 1;
      width: 100%;
      object-fit: contain;
      border-radius: 0.5rem;
    }
  }
}
</style>
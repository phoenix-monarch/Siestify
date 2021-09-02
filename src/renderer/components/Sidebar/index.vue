<template>
  <div class="sidebar">
    <div class="sidebar__nav">
      <img src="~@/assets/logo.png" alt="logo" class="sidebar__logo" />

      <main-nav />
      <!-- <second-nav /> -->
    </div>

    <div class="sidebar__player" v-if="currentTrack">
      <img
        v-lazy="currentTrack.thumbnailM"
        alt="player-image"
        class="sidebar__player--image"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MainNav from "./MainNav.vue";
import SecondNav from "./SecondNav.vue";

export default {
  name: "sidebar",
  computed: {
    ...mapGetters(["currentTrack"]),
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
  padding: 2rem 1.5rem;
  color: $text-grayish-color;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 9rem;

  &__logo {
    max-width: 80%;
  }

  &__player {
    max-width: 90%;
    &--image {
      aspect-ratio: 1 / 1;
      width: 100%;
      object-fit: contain;
      border-radius: 0.5rem;
    }
  }
}
</style>
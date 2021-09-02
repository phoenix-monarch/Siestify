<template>
  <div class="genres">
    <div
      class="genres__background"
      :style="{
        'background-image': `url(${data.cover})`,
      }"
    >
      <div class="overlay"></div>
    </div>
    <div class="genres__content">
      <playlist-carousel
        v-for="playlist in data.sections"
        :key="playlist.title"
        :title="playlist.title"
        :items="playlist.items"
      />
    </div>
  </div>
</template>

<script>
import PlaylistCarousel from "../../carousels/PlaylistCarousel.vue";
import data from "../../data/dynamic-genres.json";

export default {
  components: { PlaylistCarousel },
  data() {
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.genres {
  position: relative;

  &__background {
    z-index: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20rem;
    background-size: contain;

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        transparent,
        rgba($color: $background-color, $alpha: 1)
      );
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: 2rem;
    padding-top: 15rem;

    & > * + * {
      margin-top: 2rem;
    }
  }
}
</style>
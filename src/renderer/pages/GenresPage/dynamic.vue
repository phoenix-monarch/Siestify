<template>
  <div class="genres">
    <div v-if="!isLoading">
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
          @click="handleClick"
        />
      </div>
    </div>

    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { useQuery } from "vue-query";
import PlaylistCarousel from "../../carousels/PlaylistCarousel.vue";
import { GenresDetailsQuery } from "../../services/genres";
import Spinner from "../../components/Spinner.vue";

export default {
  components: { PlaylistCarousel, Spinner },
  setup(_, { root }) {
    const { id } = root.$route.params;
    const router = root.$router;

    const { data, isLoading, isError } = useQuery(
      reactive(["genres", { id }]),
      () => GenresDetailsQuery(id)
    );

    const handleClick = (item) => {
      router.push({ name: "album", params: { id: item.encodeId } });
    };

    return { data, isLoading, isError, handleClick };
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
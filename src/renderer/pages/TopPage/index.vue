<template>
  <div class="top">
    <div v-if="!isLoading">
      <playlist-carousel
        v-for="playlist in list"
        :key="playlist.encodeId"
        :title="playlist.genre.name"
        :items="playlist.items"
        @click="handleClick"
      />
    </div>

    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import { useQuery } from "vue-query";
import PlaylistCarousel from "../../carousels/PlaylistCarousel.vue";
import Spinner from "../../components/Spinner.vue";
import TopQuery from "../../services/top";

export default {
  setup() {
    const { data: list, isLoading, isError } = useQuery("top", TopQuery);

    return { list, isLoading, isError };
  },
  components: {
    PlaylistCarousel,
    Spinner,
  },
  methods: {
    handleClick(item) {
      this.$router.push({ name: "album", params: { id: item.encodeId } });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin: 3rem 2rem;
  margin-bottom: 1.5rem;

  & > * + * {
    margin-top: 1.5rem;
  }
}
</style>
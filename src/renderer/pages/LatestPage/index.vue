<template>
  <div class="latest">
    <div v-if="isLoading">
      <spinner />
    </div>

    <div class="latest__background">
      <div class="overlay"></div>
    </div>

    <div class="latest__content">
      <h1 class="content__title">Mới phát hành</h1>
      <songs-table v-if="!isLoading" :ranking="true" :songs="data.items" />
    </div>
  </div>
</template>

<script>
import { useQuery } from "vue-query";

import SongsTable from "../../components/SongsTable.vue";
import NewReleaseQuery from "../../services/newRelease";
import InfiniteScroll from "../../components/InfiniteScroll.vue";
import Spinner from "../../components/Spinner.vue";

export default {
  components: {
    SongsTable,
    InfiniteScroll,
    Spinner,
  },
  setup() {
    const { data, isLoading, isError } = useQuery("latest", NewReleaseQuery);

    return { data, isLoading, isError };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.latest {
  position: relative;

  &__background {
    z-index: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20rem;
    background-image: url("~@/assets/background.jpg");
    background-size: cover;

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        rgba($color: $background-color, $alpha: 0.6),
        rgba($color: $background-color, $alpha: 1)
      );
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: 2rem;
    padding-top: 10rem;
  }
}

.content__title {
  margin-bottom: 1rem;
}
</style>
<template>
  <div class="main">
    <div v-if="!isLoading">
      <global-carousel
        v-for="item in playlists"
        :key="item.encodeId"
        :item="item"
      />

      <infinite-scroll @fetch="hasNextPage && fetchNextPage()" />
    </div>

    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import { useInfiniteQuery } from "vue-query";
import { ref, reactive, computed } from "@vue/composition-api";

import GlobalCarousel from "../../carousels/GlobalCarousel.vue";
import HomeQuery from "../../services/home";
import InfiniteScroll from "../../components/InfiniteScroll.vue";
import Button from "../../components/Button.vue";
import Spinner from "../../components/Spinner.vue";

export default {
  setup() {
    const page = ref(1);

    const queryKey = reactive(["home", { page: page.value }]);

    const { data, isLoading, isError, isFetching, fetchNextPage, hasNextPage } =
      useInfiniteQuery(queryKey, ({ pageParam = 1 }) => HomeQuery(pageParam), {
        getNextPageParam: ({ hasMore, nextPage }) => {
          if (!hasMore) return false;

          return nextPage;
        },
      });

    const playlists = computed(
      () => data.value?.pages.map(({ items }) => items).flat() || []
    );

    return {
      page,
      playlists,
      isLoading,
      isError,
      isFetching,
      fetchNextPage,
      hasNextPage,
    };
  },
  components: {
    GlobalCarousel,
    InfiniteScroll,
    Button,
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 3rem 2rem;
  margin-bottom: 1.5rem;

  & > * + * {
    margin-top: 1.5rem;
  }
}
</style>
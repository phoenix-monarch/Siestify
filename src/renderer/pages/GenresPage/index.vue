<template>
  <div class="genres">
    <div v-if="isLoading">
      <spinner />
    </div>

    <fragment v-else>
      <div class="banner">
        <router-link to="/">
          <img v-lazy="getRandomBanner().cover" alt="banner" />
        </router-link>
      </div>

      <div class="topic">
        <topic-carousel
          title="Tâm Trạng Và Hoạt Động"
          :items="list.topic"
          :options="{
            perPage: 1,
            perPageCustom: [
              [1024, 3],
              [768, 2],
            ],
          }"
        />
      </div>

      <div class="nations">
        <playlist-carousel
          title="Quốc gia"
          :items="list.nations"
          :options="{
            perPage: 1,
            perPageCustom: [
              [1024, 3],
              [768, 2],
            ],
          }"
        />
      </div>

      <div class="genre">
        <playlist-carousel
          v-for="playlist in list.genre"
          :key="playlist.encodeId"
          :title="playlist.title"
          :items="playlist.playlists"
        />
      </div>
    </fragment>
  </div>
</template>

<script>
import TopicCarousel from "../../carousels/TopicCarousel.vue";
import PlaylistCarousel from "../../carousels/PlaylistCarousel.vue";
import GenresHomeQuery from "../../services/genres";
import Spinner from "../../components/Spinner.vue";

export default {
  data() {
    return {
      list: {},
      isLoading: false,
      isError: false,
    };
  },
  components: {
    TopicCarousel,
    PlaylistCarousel,
    Spinner,
  },
  created() {
    this.fetch();
  },
  methods: {
    getRandomBanner() {
      const { banners } = this.list;

      const randomIndex = Math.floor(Math.random() * banners.length);

      return banners[randomIndex];
    },
    async fetch() {
      this.isLoading = true;
      const items = await GenresHomeQuery();

      this.isLoading = false;
      this.list = items;
    },
  },
};
</script>

<style lang="scss" scoped>
.genres {
  width: 100%;
  height: 100%;
  padding: 2rem;

  & > * + * {
    margin-top: 2rem;
  }

  .banner {
    padding: 0.5rem;
    overflow: hidden;
    border-radius: 0.5rem;

    img {
      border-radius: 0.5rem;
      object-fit: cover;
      width: 100%;
      transition: transform 300ms;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
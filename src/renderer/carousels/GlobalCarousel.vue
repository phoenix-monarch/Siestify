<template>
  <div>
    <playlist-carousel
      v-if="item.sectionType === 'playlist'"
      v-bind="list"
      @click="handlePlaylistClick"
    />

    <mood-carousel
      v-else-if="item.sectionType === 'genre_mood'"
      v-bind="list"
    />
  </div>
</template>

<script>
import PlaylistCarousel from "./PlaylistCarousel.vue";
import MoodCarousel from "./MoodCarousel.vue";

export default {
  props: ["item"],
  data() {
    // Sometime API return options, we have to remove it
    const { options, ...list } = this.item;

    return {
      list,
    };
  },
  components: {
    PlaylistCarousel,
    MoodCarousel,
  },
  methods: {
    handlePlaylistClick(item) {
      this.$router.push({ name: "album", params: { id: item.encodeId } });
    },
  },
};
</script>

<style>
</style>
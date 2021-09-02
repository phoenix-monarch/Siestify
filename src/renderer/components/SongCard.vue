<template>
  <div class="song__info" @click="handleClick">
    <slot name="before" />

    <div class="song__container">
      <img class="song__thumbnail" v-lazy="song.thumbnail" />

      <div class="song__text">
        <span class="song__title">{{ song.title }}</span>
        <span class="song__artists">{{ song.artistsNames }}</span>
      </div>
    </div>

    <slot name="after" />
  </div>
</template>

<script>
export default {
  props: ["song"],
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.song {
  &__thumbnail {
    margin-right: 0.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 6px;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__container {
    display: flex;
    align-items: center;
  }

  &__title {
    color: $text-color;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  &__artists {
    font-size: 0.7rem;
    color: $text-secondary-color;
  }
}
</style>
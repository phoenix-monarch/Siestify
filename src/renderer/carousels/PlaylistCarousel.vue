<template>
  <carousel :title="title" :options="options">
    <slide v-for="item in items" :key="item.encodeId">
      <div class="carousel__item" @click="handleClick(item)">
        <div class="carousel__item--img" v-lazy-container="{ selector: 'img' }">
          <img
            :data-src="
              item.thumbnailM ||
              item.thumbnailHasText ||
              item.coverHM ||
              item.coverH ||
              item.coverV ||
              item.coverVM ||
              item.cover ||
              item.thumbnail
            "
            class="carousel__image"
          />

          <button-icon class="carousel__item--button">
            <icon name="play" width="1.2rem" height="1.2rem" />
          </button-icon>
        </div>
        <span>
          {{ item.title }}
        </span>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "../components/Carousel";
import Icon from "../components/Icon.vue";
import ButtonIcon from "../components/ButtonIcon.vue";

export default {
  props: ["title", "items", "options"],
  components: {
    Carousel,
    Slide,
    Icon,
    ButtonIcon,
  },
  methods: {
    handleClick(item) {
      this.$emit("click", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.carousel__item {
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & > * + * {
    margin-top: 0.5rem;
  }

  &--img {
    position: relative;
  }

  &--button {
    opacity: 0;
    animation: fadeDown 300ms;
    animation-fill-mode: forwards;
    position: absolute;
    bottom: 0.8rem;
    right: 0.5rem;
    padding: 0.7rem;
    border-radius: 50%;
    background-color: $primary-color;
    color: white;
    display: flex;
    -webkit-box-shadow: 1px 5px 6px 0px rgba(0, 0, 0, 0.66);
    box-shadow: 1px 5px 6px 0px rgba(0, 0, 0, 0.66);
  }
}

/deep/ .VueCarousel-slide {
  &:hover {
    background-color: rgba($color: #ffffff, $alpha: 0.2);
  }

  &:hover .carousel__item--button {
    animation: fadeUp 300ms;
    animation-fill-mode: forwards;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
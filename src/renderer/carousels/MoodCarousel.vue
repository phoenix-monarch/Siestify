<template>
  <carousel :title="title">
    <slide v-for="item in items" :key="item.encodeId">
      <router-link
        :to="{ name: 'dynamic-genres', params: { id: item.encodeId } }"
      >
        <div class="carousel__item">
          <div class="carousel__item--img">
            <img v-lazy="item.thumbnailHasText" class="carousel__image" />
          </div>
        </div>
      </router-link>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "../components/Carousel";

export default {
  props: ["title", "items"],
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="scss" scoped>
.carousel__item {
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
    transition: transform 300ms;
    border-radius: 0.5rem;

    &:hover {
      transform: scale(1.2);
    }
  }

  & > * + * {
    margin-top: 0.5rem;
  }
}
</style>
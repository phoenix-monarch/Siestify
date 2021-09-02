<template>
  <carousel :title="title" :options="options">
    <slide v-for="item in items" :key="item.encodeId">
      <router-link
        :to="{ name: 'dynamic-genres', params: { id: item.encodeId } }"
      >
        <div class="carousel__item">
          <div class="carousel__item--img">
            <img v-lazy="item.thumbnailR" class="carousel__image" />
          </div>
          <div class="carousel__item--overlay">
            <span>
              {{ item.title }}
            </span>

            <div class="carousel__playlists">
              <img
                v-for="playlist in item.playlists"
                v-lazy="playlist.thumbnail"
                :key="playlist.encodeId"
              />
            </div>
          </div>
        </div>
      </router-link>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "../components/Carousel";

export default {
  props: ["title", "items", "options"],
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="scss" scoped>
.carousel__item {
  position: relative;
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

  &--overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    background-image: linear-gradient(
      transparent,
      rgba($color: #000000, $alpha: 0.7)
    );
    border-radius: 0.5rem;

    span {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    img {
      width: 4rem;
      height: 4rem;
    }
  }

  & > * + * {
    margin-top: 0.5rem;
  }
}

.carousel__playlists {
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 0.5rem;
  }
}
</style>
<template>
  <div class="carousel">
    <div class="carousel__header">
      <span class="carousel__header--title">
        {{ title }}
      </span>

      <div class="carousel__header--navigation">
        <div
          @click="SlideCarousel('prev')"
          class="navigation__arrow navigation__arrow--left"
          :class="{ disabled: prev.disabled }"
        >
          <icon name="angle-left" width="2rem" height="2rem" />
        </div>
        <div
          @click="SlideCarousel('next')"
          class="navigation__arrow navigation__arrow--right"
          :class="{ disabled: next.disabled }"
        >
          <icon name="angle-right" width="2rem" height="2rem" />
        </div>
      </div>
    </div>

    <carousel
      ref="carousel"
      :perPage="2"
      :perPageCustom="[
        [1024, 4],
        [768, 3],
      ]"
      :loop="false"
      :mouse-drag="true"
      :paginationEnabled="false"
    >
      <slide v-for="item in items" :key="item.encodeId">
        <router-link :to="{ name: 'album', params: { id: item.encodeId } }">
          <div class="carousel__item">
            <div class="carousel__item--img">
              <img
                :src="
                  item.thumbnailM ||
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
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Icon from "../components/Icon.vue";
import ButtonIcon from "./ButtonIcon.vue";

export default {
  name: "main-carousel",
  props: ["title", "items"],
  components: {
    Carousel,
    Slide,
    Icon,
    ButtonIcon,
  },
  data() {
    return {
      prev: {
        disabled: true,
      },
      next: {
        disabled: false,
      },
    };
  },
  methods: {
    SlideCarousel(value) {
      const { carousel } = this.$refs;

      const { currentPage, pageCount } = carousel;

      if (value === "prev") {
        if (currentPage === 0) {
          return;
        }

        carousel.goToPage(currentPage - 1);
      } else if (currentPage < pageCount) {
        carousel.goToPage(currentPage + 1);
      }

      const { canAdvanceBackward, canAdvanceForward } = carousel;

      this.prev.disabled = !canAdvanceBackward;
      this.next.disabled = !canAdvanceForward;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

img {
  width: 100%;
  object-fit: cover;
}

/deep/ .VueCarousel-slide {
  padding: 0.7rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 300ms;

  &:hover {
    background-color: rgba($color: #ffffff, $alpha: 0.2);
  }

  &:hover .carousel__item--button {
    animation: fadeUp 300ms;
    animation-fill-mode: forwards;
  }
}

.carousel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--title {
    margin-left: 0.5rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  &--navigation {
    display: flex;
    align-items: center;
  }

  .navigation__arrow {
    cursor: pointer;

    &.disabled {
      color: $text-secondary-color;
    }
  }
}

.carousel__item {
  cursor: pointer;

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

.carousel__image {
  border-radius: 0.5rem;
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
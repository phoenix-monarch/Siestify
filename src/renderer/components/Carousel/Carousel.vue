<template>
  <div class="carousel">
    <div class="carousel__header">
      <span class="carousel__header--title">
        {{ title }}
      </span>

      <div class="carousel__header--navigation">
        <button-icon
          @click="SlideCarousel('prev')"
          class="navigation__arrow navigation__arrow--left"
          :class="{ disabled: prev.disabled }"
        >
          <icon name="angle-left" width="2rem" height="2rem" />
        </button-icon>
        <button-icon
          @click="SlideCarousel('next')"
          class="navigation__arrow navigation__arrow--right"
          :class="{ disabled: next.disabled }"
        >
          <icon name="angle-right" width="2rem" height="2rem" />
        </button-icon>
      </div>
    </div>

    <carousel
      ref="carousel"
      :loop="false"
      :mouse-drag="true"
      :paginationEnabled="false"
      v-bind="options"
    >
      <slot></slot>
    </carousel>
  </div>
</template>

<script>
import { Carousel } from "vue-carousel";
import Icon from "../Icon.vue";
import ButtonIcon from "../ButtonIcon.vue";

export default {
  props: {
    title: {
      default: "",
    },
    items: {
      default: () => [],
    },
    options: {
      default: () => ({
        perPage: 2,
        perPageCustom: [
          [1024, 4],
          [768, 3],
        ],
      }),
    },
  },
  components: {
    Carousel,
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
@import "../../styles/variables.scss";

/deep/ .VueCarousel-slide {
  padding: 0.7rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 300ms;
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
</style>
<template>
  <div class="dropdown">
    <div class="dropdown__button" @click="toggleShow">
      <text-icon>
        <span class="dropdown__button--text"> {{ text }}</span>

        <icon
          v-if="!show"
          name="angle-down"
          width="1.3rem"
          height="1.3rem"
          color="currentColor"
          fill="currentColor"
        />

        <icon
          v-else
          name="angle-up"
          width="1.3rem"
          height="1.3rem"
          color="currentColor"
          fill="currentColor"
        />
      </text-icon>
    </div>

    <collapse-transition>
      <div class="dropdown__panel" v-show="show">
        <slot></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import TextIcon from "./TextIcon.vue";
import CollapseTransition from "./CollapseTransition.vue";
import Icon from "./Icon.vue";

export default {
  name: "dropdown",
  props: ["text"],
  components: {
    TextIcon,
    CollapseTransition,
    Icon,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.dropdown {
  &__panel {
    transition: height 300ms;

    overflow-y: scroll;

    /deep/ & * {
      color: $text-secondary-color;
    }

    /deep/ & > * + * {
      margin-top: 0.25rem;
    }
  }

  &__button {
    cursor: pointer;
  }

  & > * + * {
    margin-top: 0.5rem;
  }
}
</style>
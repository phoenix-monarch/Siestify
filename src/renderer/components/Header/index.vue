<template>
  <div class="header" :class="{ scrolling: scrolled }">
    <div class="header__logo">
      <img src="~@/assets/logo.png" alt="logo" />
    </div>
    <div class="header__buttons">
      <div @click="minimizeWindow">
        <icon
          name="minus"
          width="1rem"
          height="1rem"
          class="header__button header__button--minimize"
        />
      </div>

      <div @click="maximizeWindow">
        <icon
          name="square-full"
          width="0.8rem"
          height="0.8rem"
          class="header__button header__button--maximize"
        />
      </div>

      <div @click="closeWindow">
        <icon
          name="times"
          width="1.2rem"
          height="1.2rem"
          class="header__button header__button--close"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
const { remote } = require("electron");
const electronWindow = remote.getCurrentWindow();

export default {
  components: { Icon },
  name: "app-header",
  methods: {
    closeWindow() {
      electronWindow.close();
    },

    minimizeWindow() {
      electronWindow.minimize();
    },

    maximizeWindow() {
      if (electronWindow.isMaximized()) {
        electronWindow.unmaximize();
      } else {
        electronWindow.maximize();
      }
    },
    handleScroll() {
      const content = document.querySelector(".content");

      this.scrolled = content.scrollTop > 10;
    },
  },
  data() {
    return {
      scrolled: false,
    };
  },
  mounted() {
    const content = document.querySelector(".content");

    content.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

.header {
  position: absolute;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  padding-top: 0.5rem;
  top: 0;
  z-index: 2;
  -webkit-app-region: drag;

  &.scrolling {
    background-color: $background-color;
  }

  &__logo {
    height: 100%;

    & > img {
      height: 100%;
      object-fit: contain;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;
    height: max-content;
  }

  &__button {
    cursor: pointer;
    padding: 0 0.2rem;
    -webkit-app-region: no-drag;
    height: max-content;

    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.2);
    }
  }
}
</style>
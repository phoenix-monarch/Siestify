<template>
  <div class="header" :class="{ scrolling: scrolled }">
    <div class="header__left"></div>
    <div class="header__right">
      <div class="header__navigation">
        <div
          class="header__button--container header__navigation--left"
          :class="{ disabled: !hasPrevious }"
          @click="goBack"
        >
          <icon name="angle-left" width="1.6rem" height="1.6rem" />
        </div>
        <div
          class="header__button--container header__navigation--right"
          @click="goForward"
          :class="{ disabled: !hasForward }"
        >
          <icon name="angle-right" width="1.6rem" height="1.6rem" />
        </div>
      </div>

      <div class="header__buttons">
        <div class="header__button--container" @click="minimizeWindow">
          <icon
            name="minus"
            width="1rem"
            height="1rem"
            class="header__button header__button--minimize"
          />
        </div>

        <div class="header__button--container" @click="maximizeWindow">
          <icon
            name="square-full"
            width="1rem"
            height="1rem"
            class="header__button header__button--maximize"
          />
        </div>

        <div class="header__button--container" @click="closeWindow">
          <icon
            name="times"
            width="1rem"
            height="1rem"
            class="header__button header__button--close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
import ButtonIcon from "../ButtonIcon.vue";
const { remote } = require("electron");
const electronWindow = remote.getCurrentWindow();

export default {
  components: { Icon, ButtonIcon },
  name: "app-header",
  data() {
    const history = this.$routerHistory;

    return {
      hasPrevious: history.hasPrevious(),
      hasForward: history.hasForward(),
      history,
      scrolled: false,
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: this.$routerHistory.previous().path });
    },
    goForward() {
      this.$router.push({ path: this.$routerHistory.next().path });
    },

    closeWindow() {
      electronWindow.close();
    },

    minimizeWindow() {
      electronWindow.minimize();
    },

    maximizeWindow() {
      const window = remote.BrowserWindow.getFocusedWindow();

      window.setFullScreen(!window.isFullScreen());
    },
    handleScroll() {
      const content = document.querySelector(".content");

      this.scrolled = content.scrollTop > 10;
    },
  },
  mounted() {
    const content = document.querySelector(".content");

    content.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    "history._current": function () {
      this.hasPrevious = this.history.hasPrevious();
      this.hasForward = this.history.hasForward();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

.header {
  position: absolute;
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  padding: 0 1rem;
  padding-top: 0.5rem;
  top: 0;
  z-index: 2;
  -webkit-app-region: drag;
  background-color: transparent;
  transition: background-color 300ms;

  &.scrolling {
    background-color: $background-color;
  }

  &__left {
    grid-column: span 2 / span 2;
  }

  &__right {
    grid-column: span 7 / span 7;

    display: flex;
    justify-content: space-between;
  }

  &__navigation {
    display: flex;
    -webkit-app-region: no-drag;

    & > * {
      cursor: pointer;

      &.disabled {
        color: $text-secondary-color;
        cursor: no-drop;
      }
    }

    & > * + * {
      margin-left: 0.5rem;
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
    color: $text-secondary-color;

    &:hover {
      color: $text-color;
    }

    &--container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
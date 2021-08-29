<template>
  <div class="player">
    <div class="player__controls">
      <div class="player__controls--song">
        <span class="song__title"> Let's Fall In Love For The Night</span>
        <span class="song__author">FINNEAS</span>
      </div>

      <div class="player__controls--main">
        <button-icon class="controls__button">
          <icon name="step-backward" width="1.2rem" height="1.2rem" />
        </button-icon>

        <button-icon
          @click="onPlayClick"
          class="controls__button controls__button--play"
        >
          <icon name="play" width="1.5rem" height="1.5rem" />
        </button-icon>

        <button-icon class="controls__button">
          <icon name="skip-forward" width="1.2rem" height="1.2rem" />
        </button-icon>
      </div>
      <div class="player__controls--secondary">
        <button-icon class="controls__button">
          <icon name="arrow-random" width="1rem" height="1rem" />
        </button-icon>

        <button-icon class="controls__button">
          <icon name="repeat" width="1.2rem" height="1.2rem" />
        </button-icon>

        <button-icon class="controls__button controls__button--volumn">
          <icon name="volume-up" width="1.2rem" height="1.2rem" />

          <slider width="4rem" @change="onVolumnChange" />
        </button-icon>
      </div>
    </div>
    <div class="player__info">
      <div class="player__info--progress">
        <slider @change="onProgressChange" :max="1000" />
      </div>

      <div class="player__info--time">
        <span>5:00</span>
        <span>10:00</span>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import ButtonIcon from "./ButtonIcon.vue";
import Icon from "./Icon.vue";
export default {
  name: "player",
  components: {
    Icon,
    Slider,
    ButtonIcon,
  },
  data() {
    return {
      volumn: {
        value: 0,
      },
      audio: {
        value: 0,
      },
    };
  },
  methods: {
    onPlayClick() {
      console.log("PLAY CLICK");
    },
    onVolumnChange(num) {
      console.log(num);
    },
    onProgressChange(num) {
      console.log(num);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.player {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 9rem;
  padding: 1rem 1.5rem;

  & > * + * {
    margin-top: 0.5rem;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 50%;

    &--song {
      max-width: 30%;
      display: flex;
      flex-direction: column;

      & > * {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;

        & + * {
          margin-top: 0.2rem;
        }
      }

      .song__title {
        font-size: 1rem;
        color: $text-color;
      }

      .song__author {
        font-size: 0.7rem;
        color: $text-secondary-color;
      }
    }

    &--main {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      color: $text-secondary-color;
    }

    &--secondary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      color: $text-secondary-color;

      & > * + * {
        margin-left: 1rem;
      }
    }
    .controls__button {
      display: flex;
      align-items: center;
      transition: color 300ms;

      &:hover {
        color: white;
      }

      &--volumn {
        & > * + * {
          margin-left: 0.5rem;
        }
      }

      &--play {
        padding: 0.5rem;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 1rem;
        color: $text-color;
        transition: color 300ms, border 300ms !important;

        &:hover {
          color: $primary-color !important;
          border: 2px solid $primary-color;
        }
      }
    }
  }

  &__info {
    &--time {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      color: $text-secondary-color;
      font-size: 0.8rem;
    }
  }
}
</style>
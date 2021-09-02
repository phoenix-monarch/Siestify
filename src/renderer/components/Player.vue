<template>
  <div class="player">
    <div class="player__controls" :class="{ 'flex-end': !currentTrack }">
      <div class="player__controls--song" v-if="currentTrack">
        <span class="song__title">{{ currentTrack.title }}</span>
        <span class="song__author">{{ currentTrack.artistsNames }}</span>
      </div>

      <div class="player__controls--main">
        <button-icon
          class="controls__button"
          @click="prevSong"
          :disabled="isFirstSong"
        >
          <icon name="step-backward" width="1.2rem" height="1.2rem" />
        </button-icon>

        <div
          v-if="audioLoading"
          class="controls__button controls__button--loading"
        >
          <spinner />
        </div>

        <button-icon
          v-else
          @click="onPlayClick"
          class="controls__button controls__button--play"
        >
          <icon v-if="!isPlaying" name="play" width="1.5rem" height="1.5rem" />
          <icon v-else name="pause" width="1.5rem" height="1.5rem" />
        </button-icon>

        <tooltip placement="top" :disabled="!nextSongInfo && isLastSong">
          <div class="next__song" v-if="nextSongInfo && !isLastSong">
            <img class="next__song-image" v-lazy="nextSongInfo.thumbnailM" />
            <div class="next__song-info">
              <span class="next__song--title">
                {{ nextSongInfo.title }}
              </span>
              <span class="next__song--artists">
                {{ nextSongInfo.artistsNames }}
              </span>
            </div>
          </div>

          <button-icon
            class="controls__button"
            @click="nextSong"
            slot="reference"
            :disabled="isLastSong"
          >
            <icon name="skip-forward" width="1.2rem" height="1.2rem" />
          </button-icon>
        </tooltip>
      </div>
      <div class="player__controls--secondary">
        <tooltip>
          <span>
            {{ isRandom ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên" }}
          </span>

          <button-icon
            class="controls__button"
            :active="isRandom"
            @click="toggleRandom"
            slot="reference"
          >
            <icon name="arrow-random" width="1rem" height="1rem" />
          </button-icon>
        </tooltip>

        <tooltip>
          <span>
            {{ isRepeat ? "Tắt lặp lại bài hát" : "Bật lặp lại bài hát" }}
          </span>

          <button-icon
            class="controls__button"
            :active="isRepeat"
            @click="toggleRepeat"
            slot="reference"
          >
            <icon name="repeat" width="1.2rem" height="1.2rem" />
          </button-icon>
        </tooltip>

        <div class="controls__button controls__button--volume">
          <button-icon @click="onVolumeClick">
            <icon
              v-if="volume.value > 0.75"
              name="volume-up"
              width="1.4rem"
              height="1.4rem"
            />
            <icon
              v-else-if="volume.value <= 0.75 && volume.value > 0.5"
              name="volume"
              width="1.4rem"
              height="1.4rem"
            />
            <icon
              v-else-if="volume.value <= 0.5 && volume.value > 0.1"
              name="volume-down"
              width="1.4rem"
              height="1.4rem"
            />
            <icon
              v-else-if="volume.value <= 0.1"
              name="volume-mute"
              width="1.4rem"
              height="1.4rem"
            />
          </button-icon>
          <slider
            width="4rem"
            @change="onVolumeChange"
            :value="volume.value"
            :max="1"
            :interval="0.01"
          />
        </div>

        <tooltip>
          <span> Danh sách phát </span>

          <button-icon
            class="controls__button"
            :active="isTracksMenuOn"
            @click="toggleTracksMenu"
            slot="reference"
          >
            <icon name="list-ol-alt" width="1.2rem" height="1.2rem" />
          </button-icon>
        </tooltip>

        <drawer class="drawer" :active="isTracksMenuOn">
          <div class="drawer__header">
            <span>Danh sách phát</span>

            <button-icon class="controls__button" @click="clearTracks()">
              <text-icon>
                <icon name="trash" width="1rem" height="1rem" />
                <span> Xóa danh sách </span>
              </text-icon>
            </button-icon>
          </div>

          <div class="drawer__content">
            <song-card
              v-for="(song, index) in tracks"
              @click="setCurrentTrackIndex(index)"
              :song="song"
              class="song-card"
              :class="{
                active: currentTrack && currentTrack.encodeId === song.encodeId,
              }"
              :key="index"
            >
              <div class="song-buttons" slot="after">
                <button-icon
                  class="controls__button"
                  @click.stop="removeTrack(song)"
                >
                  <text-icon>
                    <icon name="trash" width="1rem" height="1rem" />
                  </text-icon>
                </button-icon>
              </div>
            </song-card>
          </div>
        </drawer>
      </div>
    </div>
    <div class="player__info">
      <div class="player__info--progress">
        <slider
          @drag-end="onProgressChange"
          @click="onProgressChange"
          :max="Math.round(duration)"
          :value="Math.round(currentTime)"
          :interval="0.01"
        />
      </div>

      <div class="player__info--time">
        <span>{{ showText.currentTime }}</span>
        <span>{{ showText.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StreamingQuery from "../services/streaming";

import Slider from "./Slider.vue";
import ButtonIcon from "./ButtonIcon.vue";
import Icon from "./Icon.vue";
import Tooltip from "./Tooltip.vue";

import { parseTime } from "../utils";
import Drawer from "./Drawer.vue";
import SongCard from "./SongCard.vue";
import TextIcon from "./TextIcon.vue";
import Spinner from "./Spinner.vue";

export default {
  name: "player",
  components: {
    Icon,
    Slider,
    ButtonIcon,
    Tooltip,
    Drawer,
    SongCard,
    TextIcon,
    Spinner,
  },

  data() {
    return {
      volume: {
        value: 0.5,
      },
      showText: {
        currentTime: "0:00",
        duration: "0:00",
      },
      currentTime: 0,
      duration: 0,
      audioLoaded: false,
      audioLoading: false,
      isRepeat: false,
      isRandom: false,
      isFirstSong: !this.currentTrack,
      isLastSong: !this.currentTrack,
      isTracksMenuOn: false,
    };
  },
  methods: {
    ...mapActions([
      "addTrack",
      "setTracks",
      "clearTracks",
      "removeTrack",
      "setCurrentTrack",
      "setCurrentTrackIndex",
      "play",
      "pause",
    ]),
    onPlayClick() {
      if (!this.audioLoaded) {
        return;
      }

      if (this.isPlaying) {
        this.audioElement.pause();
        this.pause();
      } else {
        this.audioElement.play();
        this.play();
      }
    },
    onVolumeChange(num) {
      this.audioElement.volume = num;
      this.volume.value = num;
    },
    onVolumeClick() {
      if (this.volume.value === 0) {
        this.audioElement.volume = 0.5;
        this.volume.value = 0.5;
      } else {
        this.audioElement.volume = 0;
        this.volume.value = 0;
      }
    },
    onProgressChange(num) {
      this.audioElement.currentTime = num;
    },
    nextSong() {
      // If repeat is on, repeat the song.
      if (this.isRepeat) {
        this.audioElement.currentTime = 0;
        this.audioElement.play();

        return;
      }

      if (this.isRandom) {
        const randomIndex = Math.floor(Math.random() * this.tracks.length);

        this.setCurrentTrackIndex(randomIndex);

        return;
      }

      // Final song? Don't go to next song please.
      if (this.isLastSong) {
        return;
      }

      this.setCurrentTrackIndex(this.currentTrackIndex + 1);
    },
    prevSong() {
      // First song? Don't play the previous song.
      if (this.isFirstSong) {
        return;
      }

      this.setCurrentTrackIndex(this.currentTrackIndex - 1);
    },
    toggleRandom() {
      this.isRandom = !this.isRandom;
    },
    toggleRepeat() {
      this.isRepeat = !this.isRepeat;
    },
    toggleTracksMenu() {
      this.isTracksMenuOn = !this.isTracksMenuOn;
    },
    isFirstOrLastSong() {
      if (this.tracks.length < 2) {
        this.isLastSong = true;
        this.isFirstSong = true;
      } else if (this.currentTrackIndex >= this.tracks.length - 1) {
        this.isLastSong = true;
        this.isFirstSong = false;
      } else if (this.currentTrackIndex === 0) {
        this.isFirstSong = true;
        this.isLastSong = false;
      } else {
        this.isLastSong = false;
        this.isFirstSong = false;
      }
    },
    scrollToPlayingTrack() {
      const drawerContent = document.querySelector(".drawer__content");

      const playingTrack = drawerContent.querySelector(".active");

      if (playingTrack) {
        playingTrack.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  computed: {
    ...mapGetters(["isPlaying", "tracks", "currentTrack", "currentTrackIndex"]),

    nextSongInfo() {
      if (this.tracks.length <= 1) return null;

      return this.tracks[this.currentTrackIndex + 1];
    },

    audioElement() {
      const audio = new Audio();

      audio.preload = "metadata";

      audio.addEventListener("timeupdate", () => {
        this.currentTime = audio.currentTime;
        this.showText.currentTime = parseTime(audio.currentTime);
      });

      audio.addEventListener("loadedmetadata", () => {
        const { currentTime, duration } = this.audioElement;

        this.currentTime = currentTime;
        this.duration = duration;
        this.showText.currentTime = parseTime(currentTime);
        this.showText.duration = parseTime(duration);
        this.audioLoaded = true;
        this.audioLoading = false;

        this.play();
      });

      audio.addEventListener("ended", () => {
        this.nextSong();
      });

      return audio;
    },
  },
  watch: {
    tracks() {
      if (!this.currentTrack) {
        const [firstTrack] = this.tracks;

        this.setCurrentTrack(firstTrack);
      }

      this.isFirstOrLastSong();
    },
    currentTrack(track) {
      this.pause();
      this.isFirstOrLastSong();
      this.scrollToPlayingTrack();

      this.audioLoading = true;
      this.audioLoaded = false;
      this.audioElement.currentTime = 0;

      StreamingQuery(track.encodeId).then((streaming) => {
        this.audioElement.src = streaming["128"];
      });
    },

    isPlaying() {
      if (this.isPlaying) {
        this.audioElement.play();
      } else {
        this.audioElement.pause();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.player {
  background-color: $background-color;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 9rem;
  padding: 1rem 1.5rem;

  & > * + * {
    margin-top: 0.5rem;
  }

  /deep/ .song-card {
    justify-content: space-between;
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
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
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

      &--volume {
        & > * + * {
          margin-left: 0.5rem;
        }

        button {
          height: 1.4rem;
        }
      }

      &--loading {
        margin: 0 1rem;
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

    & > * + * {
      margin-top: 0.5rem;
    }
  }

  .next__song {
    display: flex;
    align-items: center;

    &-image {
      margin-right: 0.5rem;
      width: 2rem;
      height: 2rem;
    }

    &-info {
      min-width: 12rem;
    }

    &--title {
      font-size: 0.8rem;
      color: white;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &--artists {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 0.8rem;
      color: $text-secondary-color;
    }
  }

  .drawer {
    height: calc(100vh - 9rem);
    padding: 2rem 1rem;
    padding-top: 4rem;
    overflow-y: scroll;
    width: 25rem;

    /deep/ .song__info {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 6px;

      &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.1);
      }

      &.active {
        background-color: rgba($color: $primary-color, $alpha: 0.2);
      }
    }

    &__header {
      display: flex;
      margin-bottom: 1.5rem;

      & > * + * {
        margin-left: 0.5rem;
      }

      & > span {
        color: white;
        font-size: 1.2rem;
      }

      .controls__button {
        cursor: pointer;

        &:hover {
          color: white;
        }
      }
    }
  }
  .flex-end {
    justify-content: flex-end;
  }
}
</style>
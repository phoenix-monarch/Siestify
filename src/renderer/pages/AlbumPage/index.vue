<template>
  <div class="album">
    <div class="spinner" v-if="isLoading">
      <spinner />
    </div>

    <fragment v-else>
      <div class="album__header">
        <div
          class="album__header--background"
          :style="{ backgroundImage: `url(${album.thumbnailM})` }"
        >
          <div class="album__header--overlay"></div>
        </div>
        <div class="album__header--info">
          <div class="info__thumbnail">
            <img v-lazy="album.thumbnailM" />
          </div>

          <div class="info__right">
            <Button @click="setTracks(freeSongs)" class="listen_button">
              <icon name="play" width="1.4rem" height="1.4rem" />
              <span> Nghe tất cả </span>
            </Button>

            <div class="info__text">
              <span class="info__title">{{ album.title }}</span>
              <div class="info__alt">
                <span class="info__updated">{{
                  toDate(album.contentLastUpdate)
                }}</span>
                <span class="info__like"
                  >{{ numberWithCommas(album.like) }} lượt thích</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="album__content">
        <songs-table :songs="freeSongs" />
      </div>
    </fragment>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import { useQuery } from "vue-query";
import { mapActions } from "vuex";
import dayjs from "dayjs";

import { numberWithCommas } from "../../utils";
import Button from "../../components/Button.vue";
import Icon from "../../components/Icon.vue";
import SongsTable from "../../components/SongsTable.vue";
import Spinner from "../../components/Spinner.vue";
import AlbumQuery from "../../services/album";

export default {
  setup(_, { root }) {
    const route = root.$route;
    const { id } = route.params;

    const {
      data: album,
      isLoading,
      isError,
    } = useQuery(["album", { id }], () => AlbumQuery(id));

    const freeSongs = computed(
      () =>
        album.value?.song.items.filter((item) => item.streamingStatus === 1) ||
        []
    );

    return { album, isLoading, isError, freeSongs };
  },

  components: {
    Button,
    SongsTable,
    Icon,
    Spinner,
  },

  methods: {
    numberWithCommas,
    toDate(time) {
      return dayjs.unix(time).format("DD/MM/YYYY");
    },
    ...mapActions(["setTracks"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.album {
  width: 100%;
  height: 100%;

  .first {
    flex: 2;
  }

  .actions {
    display: flex;
    align-items: center;

    & > * + * {
      margin-left: 0.5rem;
    }
  }

  &__header {
    position: relative;
    height: 50%;
    width: 100%;

    &--background {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
    }

    &--overlay {
      background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      width: 100%;
      height: 100%;
    }

    &--info {
      display: flex;
      position: absolute;
      bottom: 0.7rem;
      left: 2rem;

      & > * + * {
        margin-left: 0.5rem;
      }

      .info__thumbnail {
        & > img {
          border-radius: 12px;
          max-width: 12rem;
          max-height: 12rem;
        }
      }

      .info__right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      .info__text {
        align-self: flex-end;

        .info__title {
          font-size: 1.8rem;
        }

        .info__alt {
          display: flex;
          align-items: center;
          color: $text-secondary-color;

          & > * + * {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }

  .song__thumbnail {
    margin-right: 0.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 6px;
  }

  .song__info {
    display: flex;
    align-items: center;
  }

  .song__title {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .song__artists {
    font-size: 0.7rem;
    color: $text-secondary-color;
  }

  &__content {
    max-height: 17rem;
    height: 50%;
    width: 100%;
    overflow-y: scroll;
    padding: 2rem;
  }

  .listen_button {
    display: flex;
    align-items: center;
    width: max-content;
    margin-bottom: 0.5rem;

    & > * + * {
      margin-left: 0.5rem;
    }
  }
}
</style>
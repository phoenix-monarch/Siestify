<template>
  <div class="album">
    <div class="album__header">
      <div
        class="album__header--background"
        :style="{ backgroundImage: `url(${album.thumbnailM})` }"
      >
        <div class="album__header--overlay"></div>
      </div>
      <div class="album__header--info">
        <div class="info__thumbnail">
          <img :src="album.thumbnailM" />
        </div>

        <div class="info__text">
          <span class="info__title">{{ album.title }}</span>
          <div class="info__alt">
            <span class="info__updated">29/8/2021</span>
            <span class="info__like">{{ album.like }} lượt thích</span>
          </div>
        </div>
      </div>
    </div>
    <div class="album__content">
      <cus-table>
        <template #head>
          <span>Bài hát</span>
          <span>Thời gian</span>
          <span>Sắp xếp</span>
        </template>

        <row v-for="song in album.song.items" :key="song.encodeId">
          <cell>
            <div class="song__info">
              <img class="song__thumbnail" :src="song.thumbnail" />

              <div class="song__text">
                <span class="song__title">{{ song.title }}</span>
                <span class="song__artists">{{ song.artistsNames }}</span>
              </div>
            </div>
          </cell>
          <cell>
            <span>
              {{ song.duration }}
            </span>
          </cell>
          <cell>Action here</cell>
        </row>
      </cus-table>
      <!-- <div class="table">
        <div class="table__head">
          <span>Bài hát</span>
          <span>Thời gian</span>
          <span>Sắp xếp</span>
        </div>
        <div class="table__body">
          <div
            class="table__row"
            v-for="song in album.song.items.slice(0, 5)"
            :key="song.encodeId"
          >
            <div class="table__cell song__info">
              <img class="song__thumbnail" :src="song.thumbnail" />

              <div class="song__text">
                <span class="song__title">{{ song.title }}</span>
                <span class="song__artists">{{ song.artistsNames }}</span>
              </div>
            </div>
            <div class="table__cell">
              <span>
                {{ song.duration }}
              </span>
            </div>
            <div class="table__cell">Action here</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Table as CusTable, Row, Cell } from "../../components/Table";
import album from "../../data/album.json";

export default {
  data() {
    return {
      album,
    };
  },
  components: {
    CusTable,
    Row,
    Cell,
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.album {
  width: 100%;
  height: 100%;

  &__header {
    position: relative;
    height: 45%;
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
    height: 55%;
    width: 100%;
    overflow-y: scroll;
    padding: 2rem;
  }
}
</style>
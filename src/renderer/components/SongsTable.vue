<template>
  <cus-table>
    <template #head>
      <span class="head__song">Bài hát</span>
      <span>Thời gian</span>
      <span>Hành động</span>
    </template>

    <row v-for="(song, index) in songs.slice(0, showItem)" :key="song.encodeId">
      <cell class="song__cell">
        <song-card :song="song">
          <span
            v-if="ranking"
            slot="before"
            class="song__ranking"
            :class="`top-${index + 1}`"
          >
            {{ index + 1 }}
          </span>
        </song-card>
      </cell>
      <cell>
        <span>
          {{ parseTime(song.duration) }}
        </span>
      </cell>
      <cell class="actions">
        <tooltip>
          <span>Nghe</span>

          <button-icon
            :circle="true"
            slot="reference"
            @click="listenTrack(song)"
          >
            <icon name="play" width="1.4rem" height="1.4rem" />
          </button-icon>
        </tooltip>

        <tooltip>
          <span>Thêm vào danh sách phát</span>

          <button-icon :circle="true" slot="reference" @click="addTrack(song)">
            <icon name="book-medical" width="1.4rem" height="1.4rem" />
          </button-icon>
        </tooltip>
      </cell>
    </row>

    <row>
      <infinite-scroll @fetch="onLoadMore" />
    </row>
  </cus-table>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "@vue/composition-api";

import { Table as CusTable, Row, Cell } from "./Table";
import ButtonIcon from "./ButtonIcon.vue";
import Icon from "./Icon.vue";
import Tooltip from "./Tooltip.vue";
import { parseTime } from "../utils";

import SongCard from "./SongCard.vue";
import InfiniteScroll from "./InfiniteScroll.vue";

export default {
  props: ["songs", "ranking"],
  components: {
    CusTable,
    Row,
    Cell,
    ButtonIcon,
    Icon,
    Tooltip,
    SongCard,
    InfiniteScroll,
  },
  setup() {
    const ITEM_PER_LOAD = 12;

    // Increase performance by reduce items to show
    const showItem = ref(ITEM_PER_LOAD);

    const onLoadMore = () => {
      showItem.value += ITEM_PER_LOAD;
    };

    return { onLoadMore, showItem };
  },
  methods: {
    parseTime,
    listenTrack(item) {
      this.unshiftTrack(item);
      this.setCurrentTrack(item);

      this.play();
    },
    ...mapActions(["addTrack", "unshiftTrack", "setCurrentTrack", "play"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.head__song,
.song__cell {
  flex-grow: 2;
}

/deep/ .song__ranking {
  -webkit-text-stroke: 2px $text-secondary-color;
  color: transparent;
  font-size: 2.3rem;
  min-width: 4rem;
  font-weight: 900;
  text-align: center;
  font-family: "Roboto", sans-serif;
  opacity: 1;

  &.top-1 {
    -webkit-text-stroke-color: $primary-color;
  }

  &.top-2 {
    -webkit-text-stroke-color: #6366f1;
  }

  &.top-3 {
    -webkit-text-stroke-color: #10b981;
  }
}
</style>
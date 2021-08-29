<template>
  <div id="app">
    <app-header />
    <sidebar />
    <div class="content">
      <router-view></router-view>
    </div>
    <player />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar/index.vue";
import AppHeader from "./components/Header/index.vue";
import Player from "./components/Player.vue";

export default {
  name: "siestify",
  components: {
    Sidebar,
    Player,
    AppHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/global.css";

body {
  background-color: $background-color;
  color: $text-color;
}

::-webkit-scrollbar {
  width: 0.2rem;
}

::-webkit-scrollbar-track {
  background-color: $background-color;
}

::-webkit-scrollbar-thumb {
  background-color: $scrollbar-color;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  height: 100%;
}

.content {
  grid-column: span 7 / span 7;
  padding: 2rem 2rem;
  max-height: calc(100vh - 8.5rem);
  overflow-y: scroll;
}
</style>

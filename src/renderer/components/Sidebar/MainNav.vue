<template >
  <div class="sidebar__navigation--main">
    <div v-for="route in routes" :key="route.name">
      <nav-link :to="route.path">
        <text-icon :isActive="$route.name === route.name">
          <icon :name="route.iconName" width="1.3rem" height="1.3rem" />

          <span>{{ route.title }}</span>
        </text-icon>
      </nav-link>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
import TextIcon from "../TextIcon.vue";
import NavLink from "./NavLink.vue";
export default {
  name: "main-nav",
  components: {
    TextIcon,
    NavLink,
    Icon,
  },
  created() {
    const { routes } = this.$router.options;
    const sidebarRoutes = routes.filter((route) => route.sidebar);

    this.routes = sidebarRoutes;
  },

  data() {
    return {
      routes: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.sidebar__navigation--main {
  & > * + * {
    margin-top: 1rem;
  }
}

span {
  font-size: 0.9rem;
}

.nav-link {
  color: $text-grayish-color;
}
</style>
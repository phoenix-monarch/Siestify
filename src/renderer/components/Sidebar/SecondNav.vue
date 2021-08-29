<template>
  <div class="sidebar__navigation--secondary">
    <dropdown text="Danh sách gần đây">
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
      <nav-link to="/">
        <span> This is a test </span>
      </nav-link>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from "../Dropdown.vue";
import NavLink from "./NavLink.vue";
export default {
  components: { Dropdown, NavLink },
  name: "second-nav",
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-link span {
  transition: color 300ms;
  &:hover {
    color: $text-color;
  }
}

/deep/ span {
  font-size: 0.9rem;
}

.sidebar__navigation--secondary {
  & > * + * {
    margin-top: 0.5rem;
  }

  /deep/.dropdown {
    &__panel {
      max-height: 6rem;
    }
  }

  @media screen and (min-width: 768px) {
    /deep/.dropdown {
      &__panel {
        max-height: 3.3rem;
      }
    }
  }
}
</style>
<template>
  <div class="table">
    <div class="table__head">
      <slot name="head"></slot>
    </div>
    <div class="table__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cus-table",
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.table {
  width: 100%;

  &__head,
  &__row {
    & > * + * {
      margin-left: 1rem;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0 1rem;

    & > * {
      flex: 1 1 0%;
      text-transform: uppercase;
      text-align: left;
      color: $text-secondary-color;
      font-size: 0.8rem;
    }
  }

  &__body {
    & > * + * {
      margin-top: 0.5rem;
    }
  }

  &__row {
    & > * {
      flex: 1 1 0%;
    }

    transition: background-color 300ms;

    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.1);
    }

    padding: 1rem;
    border-radius: 6px;

    display: flex;
    justify-content: space-between;
  }

  &__cell {
    display: flex;
    align-items: center;
  }
}
</style>
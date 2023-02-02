<template>
  <tr class="tr table__tr">
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
.table__tr {
  &--tbody-tr {
    border-bottom: 1px dashed rgba(#000, 0.1);
    border-left: 1px dashed rgba(#000, 0.1);
    border-right: 1px dashed rgba(#000, 0.1);
    cursor: pointer;

    &:hover {
      background-color: rgba(honeydew, 0.4);
    }
  }
}
</style>

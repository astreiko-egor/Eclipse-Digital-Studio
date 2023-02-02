<template>
  <th class="th table__th">
    <span class="table__span table__span--thead-span" v-bind="$attrs">
      <slot />
    </span>
  </th>
</template>

<script>
export default {
  name: 'AppTableTh',
  inheritAttrs: false,
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.table__th {
  color: scale-color(honeydew, $lightness: -20%, $saturation: -60%);
  border-right: 1px dashed
    scale-color(honeydew, $lightness: -20%, $saturation: -60%);

  &--click {
    cursor: pointer;
  }

  &:last-child {
    border-right: none;
  }
}
</style>

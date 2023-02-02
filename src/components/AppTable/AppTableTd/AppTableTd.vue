<template>
  <td class="td table__td">
    <span class="table__span table__span--tbody-span" v-bind="$attrs">
      <slot />
    </span>
  </td>
</template>

<script>
export default {
  name: 'AppTableTd',
  inheritAttrs: false,
};
</script>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.table__td {
  border-right: 1px dashed rgba(#000, 0.1);

  &:last-child {
    border-right: none;
  }
}
</style>

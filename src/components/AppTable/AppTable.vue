<template>
  <table class="table">
    <thead class="table__thead">
      <slot name="thead" />
    </thead>

    <tbody class="table__tbody">
      <slot name="tbody" />
    </tbody>
  </table>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
}
.table__thead {
  background-color: honeydew;
  border: 1px dashed scale-color(honeydew, $lightness: -20%, $saturation: -60%);
}
:deep(.table__span) {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  text-align: left;
}

:deep(.table__previous) {
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-left: 5px;

  &::after {
    position: relative;
    top: -1px;
    margin-left: 3px;
  }
}

:deep(.table__previous) {
  color: green;

  &::after {
    content: '↑';
  }
}

:deep(.table__previous--red) {
  color: red;

  &::after {
    content: '↓';
  }
}
</style>

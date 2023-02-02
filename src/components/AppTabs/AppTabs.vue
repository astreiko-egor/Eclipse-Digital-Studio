<template>
  <div class="tabs">
    <div class="tabs__content">
      <div class="tabs__navigation">
        <span
          v-for="({ props }, index) in listTitles"
          :key="index"
          class="tabs__navigation-item"
          :class="[
            {
              'tabs__navigation-item--active': computedCurrentTab === index,
            },
          ]"
          @click="onSelectItem(index)"
        >
          {{ props?.title }}
        </span>
      </div>
      <div class="tabs__bottom">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, computed, ref, provide, type DefineComponent } from 'vue';

const slots = useSlots();

const listItems = ref<DefineComponent[]>([]);

const registrationItem = (item: DefineComponent) => {
  listItems.value.push(item);

  if (listItems.value[computedCurrentTab.value]) {
    listItems.value[computedCurrentTab.value].setupState.localActive = true;
  }
};

provide('registrationItem', registrationItem);

const listTitles = computed(() =>
  slots.default?.().filter((item) => item.props?.title)
);

const currentTab = ref(
  slots.default?.().findIndex((t) => typeof t.props?.active !== 'undefined')
);

const computedCurrentTab = computed(() => {
  return !!currentTab.value && currentTab.value > -1 ? currentTab.value : 0;
});

const onSelectItem = (index: number) => {
  currentTab.value = index;

  listItems.value.map((item) => {
    item.setupState.localActive = false;
  });

  listItems.value[index].setupState.localActive = true;
};
</script>

<style lang="scss" scoped>
.tabs__content {
  position: relative;
}

.tabs__navigation {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 20px;
}

.tabs__navigation-item {
  padding: 10px 5px;
  opacity: 0.6;
  cursor: pointer;

  &--active {
    pointer-events: none;
    opacity: 1;
  }
}
</style>

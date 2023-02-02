<template>
  <div class="container">
    <app-tabs>
      <app-tabs-item title="Список валют" active>
        <div class="container">
          <list-of-currencies />
        </div>
      </app-tabs-item>

      <app-tabs-item title="Конвертер">
        <div class="container">
          <converter />
        </div>
      </app-tabs-item>
    </app-tabs>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { valutesStore } from '@/stores/valutes';
const AppTabs = defineAsyncComponent(
  () => import('@/components/AppTabs/AppTabs.vue')
);
const AppTabsItem = defineAsyncComponent(
  () => import('@/components/AppTabs/AppTabsItem/AppTabsItem.vue')
);
const ListOfCurrencies = defineAsyncComponent(
  () => import('@/components/ListOfCurrencies/ListOfCurrencies.vue')
);
const Converter = defineAsyncComponent(
  () => import('@/components/Converter/Converter.vue')
);
const store = valutesStore();
const { addValutes } = store;

addValutes();
</script>
<style lang="scss" scoped></style>

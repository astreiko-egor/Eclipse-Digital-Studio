<template>
  <h1 class="title">1. Список валют</h1>

  <div class="row">
    <div class="column">Поиск:</div>
    <div class="column">
      <input type="text" v-model="search" />
    </div>
  </div>

  <div class="row">
    <div class="column">Основная валюта</div>
    <div class="column">
      <select name="" id="" v-model="currentValute">
        <option
          v-for="{ CharCode } in listCharCode"
          :key="CharCode"
          :disabled="currentValute === CharCode"
          :selected="currentValute === CharCode"
        >
          {{ CharCode }}
        </option>
      </select>
    </div>
  </div>

  <app-table>
    <template #thead>
      <app-table-th class="table__th--click" @click="typeSort = 'NumCode'">
        Цифр. код
      </app-table-th>
      <app-table-th class="table__th--click" @click="typeSort = 'CharCode'">
        Букв. код
      </app-table-th>
      <app-table-th class="table__th--click" @click="typeSort = 'Name'">
        Валюта
      </app-table-th>
      <app-table-th>Курс</app-table-th>
    </template>
    <template #tbody>
      <app-table-tr
        class="table__tr--tbody-tr"
        v-for="{ ID, NumCode, CharCode, Name, Value, Previous } in listValutes"
        :key="ID"
        @click="currentValute = CharCode"
      >
        <app-table-td>{{ NumCode }}</app-table-td>
        <app-table-td>{{ CharCode }}</app-table-td>
        <app-table-td>{{ Name }}</app-table-td>
        <app-table-td>
          {{ Value.toFixed(4) }}
          <span
            v-if="Value - Previous !== 0"
            class="table__previous"
            :class="[
              Value - Previous > 0
                ? 'table__previous--green'
                : 'table__previous--red',
            ]"
          >
            (
            {{ Value - Previous > 0 ? '+' : '-' }}
            {{ Math.abs(Value - Previous).toFixed(4) }}
            )
          </span>
        </app-table-td>
      </app-table-tr>
    </template>
  </app-table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { valutesStore } from '@/stores/valutes';
import type { IValute } from '@/types/IValutes';

const AppTable = defineAsyncComponent(
  () => import('@/components/AppTable/AppTable.vue')
);
const AppTableTh = defineAsyncComponent(
  () => import('@/components/AppTable/AppTableTh/AppTableTh.vue')
);
const AppTableTr = defineAsyncComponent(
  () => import('@/components/AppTable/AppTableTr/AppTableTr.vue')
);
const AppTableTd = defineAsyncComponent(
  () => import('@/components/AppTable/AppTableTd/AppTableTd.vue')
);

const store = valutesStore();
const { valutes, rates } = storeToRefs(store);

const currentValute = ref('RUB');
const search = ref('');
const typeSort = ref('CharCode');

const listValutes = computed(() => {
  const arr: IValute[] = [];
  const objStoreValutes = valutes.value;
  const objStoreRates = rates.value;

  Object.keys(objStoreValutes).forEach((key) => {
    const newValue =
      objStoreValutes[key].Value / objStoreValutes[currentValute.value].Value;
    const newPrevious =
      objStoreValutes[key].Previous /
      objStoreValutes[currentValute.value].Previous;

    // const newValue =
    //   (objStoreValutes[currentValute.value].Nominal *
    //     objStoreRates?.today[currentValute.value]) /
    //   (objStoreValutes[key].Nominal * objStoreRates?.today[key]);
    // const newPrevious =
    //   (objStoreValutes[currentValute.value].Nominal *
    //     objStoreRates.yesterday[currentValute.value]) /
    //   (objStoreValutes[key].Nominal * objStoreRates.yesterday[key]);

    const obj: IValute = {
      ...objStoreValutes[key],
      Value: newValue,
      Previous: newPrevious,
    };
    if (currentValute.value !== key) arr.push(obj);
  });

  return arr
    .filter(
      (item) =>
        item.CharCode.toLowerCase().indexOf(search.value.toLowerCase()) >= 0 ||
        item.Name.toLowerCase().indexOf(search.value.toLowerCase()) >= 0 ||
        item.NumCode.indexOf(search.value) >= 0
    )
    .sort((a, b) => {
      if (typeSort.value === 'NumCode') {
        return +a.NumCode * 1 - +b.NumCode;
      }

      if (typeSort.value === 'Name') {
        return a.Name.localeCompare(b.Name);
      }

      return a.CharCode.localeCompare(b.CharCode);
    });
});

const listCharCode = computed(() => {
  const arr = listValutes.value.map((valute: IValute) => {
    return {
      CharCode: valute.CharCode,
    };
  });

  arr.push({
    CharCode: currentValute.value,
  });

  return arr.sort((a, b) => a.CharCode.localeCompare(b.CharCode));
});
</script>

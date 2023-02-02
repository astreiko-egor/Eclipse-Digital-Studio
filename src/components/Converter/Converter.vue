<template>
  <h1 class="title">2. Конвертер</h1>
  <div class="row">
    <div class="row">
      <div class="column">
        <input @input="convert" type="text" v-model="inputed" />
        <select @change="convert" v-model="selected[0]" name="" id="">
          <option
            v-for="charCode in listCharCode"
            :key="charCode"
            :disabled="selected[0] === charCode"
            :selected="selected[0] === charCode"
          >
            {{ charCode }}
          </option>
        </select>
      </div>
    </div>

    <button class="btn" @click="reverse">⇄</button>

    <div class="row">
      <div class="column">
        <input type="text" v-model="result" disabled />
        <select @change="convert" name="" id="" v-model="selected[1]">
          <option
            v-for="charCode in listCharCode"
            :key="charCode"
            :disabled="selected[1] === charCode"
            :selected="selected[1] === charCode"
          >
            {{ charCode }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { valutesStore } from '@/stores/valutes';

const store = valutesStore();
const { valutes } = storeToRefs(store);

const selected = ref(['RUB', 'USD']);
const inputed = ref<string | number>('');
const result = ref<string | number>('');

const convert = () => {
  let defaultValute = {
    Value: 1,
    Nominal: 1,
  };

  let firstValute = valutes.value[selected.value[0]] ?? defaultValute,
    firstValuteValue = firstValute.Value * Number(inputed.value),
    firstValuteNominal = firstValute.Nominal;

  let secondValute = valutes.value[selected.value[1]] ?? defaultValute,
    secondValuteValue = secondValute.Value,
    secondValuteNominal = secondValute.Nominal;

  let newResult =
    firstValuteValue /
    firstValuteNominal /
    (secondValuteValue / secondValuteNominal);

  result.value = newResult ? Math.floor(newResult * 10000) / 10000 : '';
};

const listCharCode = computed(() => {
  const arr: string[] = [];
  const objValutes = valutes.value;

  Object.keys(objValutes).forEach((key, index) => {
    arr.push(objValutes[key].CharCode);
  });

  return arr.sort();
});

const reverse = () => {
  // [inputed.value, result.value] = [result.value, inputed.value];
  selected.value.reverse();
  convert();
};
</script>

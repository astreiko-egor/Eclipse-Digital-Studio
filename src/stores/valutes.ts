import { ref } from 'vue';
import { defineStore } from 'pinia';
import ky from 'ky';
import type { IValutes, IValute } from '@/types/IValutes';
import type { IRates } from '@/types/IRates';

export const valutesStore = defineStore('valutes', () => {
  const valutes = ref<IValutes>({});
  const rates = ref<IRates>({
    today: {},
    yesterday: {},
  });
  async function addValutes() {
    const data = (await ky
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .json()) as {
      Valute: IValutes;
    };
    const todayRates = <{ [name: string]: number }>{};
    const yesterdayRates = <{ [name: string]: number }>{};

    data.Valute.RUB = {
      ID: 'R00000',
      NumCode: '643',
      CharCode: 'RUB',
      Nominal: 1,
      Name: 'Российский рубль',
      Value: 1,
      Previous: 1,
    } as IValute;

    for (const key in data.Valute) {
      todayRates[key] = data.Valute[key].Nominal / data.Valute[key].Value;
      yesterdayRates[key] =
        data.Valute[key].Nominal / data.Valute[key].Previous;
    }

    valutes.value = data.Valute;
    rates.value = {
      today: todayRates,
      yesterday: yesterdayRates,
    };
  }
  return { valutes, rates, addValutes };
});

import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { valutesStore } from '@/stores/valutes';

describe('Valutes Store', () => {
  it('increments', async () => {
    setActivePinia(createPinia());
    const valutes = valutesStore();
    expect(Object.keys(valutes.rates.today).length).toBe(0);
    expect(Object.keys(valutes.rates.yesterday).length).toBe(0);
    expect(Object.keys(valutes.valutes).length).toBe(0);

    await valutes.addValutes();

    expect(Object.keys(valutes.rates.today).length).not.toBe(0);
    expect(Object.keys(valutes.rates.yesterday).length).not.toBe(0);
    expect(Object.keys(valutes.valutes).length).not.toBe(0);
  });
});

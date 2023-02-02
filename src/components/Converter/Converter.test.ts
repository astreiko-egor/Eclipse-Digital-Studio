// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { valutesStore } from '@/stores/valutes';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';

import Converter from '@/components/Converter/Converter.vue';

let wrapper: VueWrapper;

describe('Converter.vue', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    const storeValutes = valutesStore();
    await storeValutes.addValutes();

    wrapper = mount(Converter, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              valutes: {
                valutes: storeValutes.valutes,
                rates: storeValutes.rates,
              },
            },
            createSpy: vi.fn,
          }),
        ],
      },
    });

    await flushPromises();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('inputed', async () => {
    // @ts-ignore
    expect(wrapper.vm.inputed).toBe('');
    wrapper.findAll('input')[0].setValue(20);
    // @ts-ignore
    expect(wrapper.vm.inputed).toBe('20');
  });

  it('selected', async () => {
    // @ts-ignore
    expect(wrapper.vm.selected).toEqual(['RUB', 'USD']);
    const leftSelect = wrapper.findAll('select')[0];
    const firstOptionLeftSelect = leftSelect.find('option');
    const firstOptionLeftSelectText = firstOptionLeftSelect.text();

    const rightSelect = wrapper.findAll('select')[1];
    const fifthOptionRightSelect = rightSelect.findAll('option')[5];
    const fifthOptionRightSelectText = firstOptionLeftSelect.text();

    await leftSelect.setValue(firstOptionLeftSelectText);
    expect(leftSelect.element.value).toBe(firstOptionLeftSelectText);

    await rightSelect.setValue(fifthOptionRightSelectText);
    expect(rightSelect.element.value).toBe(fifthOptionRightSelectText);
  });
});

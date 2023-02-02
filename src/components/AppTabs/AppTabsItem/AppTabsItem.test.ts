// @vitest-environment jsdom
import { ref } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import AppTabsItem from '@/components/AppTabs/AppTabsItem/AppTabsItem.vue';

describe('AppTabsItem.vue', () => {
  it('Содержимое помещенное между app-tabs-item помещается в блок tabs-item', () => {
    const wrapper = mount({
      template: '<app-tabs-item>app-tabs-item data</app-tabs-item>',
      components: {
        'app-tabs-item': AppTabsItem,
      },
      provide: {
        registrationItem: () => {},
      },
    });
    expect(wrapper.find('.tabs-item').text()).toEqual('app-tabs-item data');
    wrapper.unmount();
  });

  it('Компонент скрыт, если нет active и title', () => {
    const wrapper = mount({
      template:
        '<app-tabs-item class="tab1" active>Tab 1</app-tabs-item><app-tabs-item class="tab2">Tab 2</app-tabs-item>',
      components: {
        'app-tabs-item': AppTabsItem,
      },
      provide: {
        registrationItem: () => {},
      },
    });
    expect(wrapper.find('.tab1').attributes().style).toBe('display: none;');
    expect(wrapper.find('.tab2').attributes().style).toBe('display: none;');
    wrapper.unmount();
  });

  it('Правильное отображение блоков при использовании active', () => {
    const wrapper = mount({
      template:
        '<app-tabs-item class="tab1" title="Tab 1" active>Tab 1</app-tabs-item><app-tabs-item class="tab2" title="Tab 2">Tab 2</app-tabs-item>',
      components: {
        'app-tabs-item': AppTabsItem,
      },
      provide: {
        registrationItem: () => {},
      },
    });
    expect(wrapper.find('.tab1').attributes().style).not.toBe('display: none;');
    expect(wrapper.find('.tab2').attributes().style).toBe('display: none;');
    wrapper.unmount();
  });

  it('При создании компонента, происходит вызов функции inject registrationItem, если указан title', () => {
    const testValue = ref(0);
    const testValue2 = ref(0);
    const wrapper = mount({
      template: '<app-tabs-item />',
      components: {
        'app-tabs-item': AppTabsItem,
      },
      provide: {
        registrationItem: () => {
          testValue.value = 125;
        },
      },
    });
    const wrapper2 = mount({
      template: '<app-tabs-item title="Таб" />',
      components: {
        'app-tabs-item': AppTabsItem,
      },
      provide: {
        registrationItem: () => {
          testValue2.value = 125;
        },
      },
    });

    expect(testValue.value).toBe(0);
    expect(testValue2.value).toBe(125);

    wrapper.unmount();
  });
});

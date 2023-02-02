// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppTableTh from '@/components/AppTable/AppTableTh/AppTableTh.vue';

describe('AppTableTh.vue', () => {
  it('Передаваемые атрибуты подставляются внутреннему тегу span, а не th', () => {
    const wrapper = mount({
      template: '<app-table-th class="test-class"></app-table-th>',
      components: {
        'app-table-th': AppTableTh,
      },
    });

    expect(wrapper.find('span').classes()).toEqual(
      expect.arrayContaining(['test-class'])
    );
    expect(wrapper.classes()).not.toEqual(
      expect.arrayContaining(['test-class'])
    );
  });

  it('Все помещенное между тегами app-table-th, помещается в внутренний span', () => {
    const wrapper = mount({
      template: '<app-table-th>test data</app-table-th>',
      components: {
        'app-table-th': AppTableTh,
      },
    });

    expect(wrapper.find('span').text()).toEqual('test data');
    wrapper.unmount();
  });
});

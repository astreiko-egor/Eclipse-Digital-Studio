// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppTableTd from '@/components/AppTable/AppTableTd/AppTableTd.vue';

describe('AppTableTd.vue', () => {
  it('Передаваемые атрибуты подставляются внутреннему тегу span, а не td', () => {
    const wrapper = mount({
      template: '<app-table-td class="test-class"></app-table-td>',
      components: {
        'app-table-td': AppTableTd,
      },
    });

    expect(wrapper.find('span').classes()).toEqual(
      expect.arrayContaining(['test-class'])
    );
    expect(wrapper.classes()).not.toEqual(
      expect.arrayContaining(['test-class'])
    );

    wrapper.unmount();
  });

  it('Все помещенное между тегами app-table-td, помещается в внутренний span', () => {
    const wrapper = mount({
      template: '<app-table-td>test data</app-table-td>',
      components: {
        'app-table-td': AppTableTd,
      },
    });

    expect(wrapper.find('span').text()).toEqual('test data');
    wrapper.unmount();
  });
});

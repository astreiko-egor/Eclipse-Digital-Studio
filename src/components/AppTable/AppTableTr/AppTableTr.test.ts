// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppTableTr from '@/components/AppTable/AppTableTr/AppTableTr.vue';

describe('AppTableTr.vue', () => {
  it('Все помещенное между тегами app-table-tr, помещается в внутренний tr', () => {
    const wrapper = mount({
      template: '<app-table-tr>test data</app-table-tr>',
      components: {
        'app-table-tr': AppTableTr,
      },
    });

    expect(wrapper.find('tr').text()).toEqual('test data');
    wrapper.unmount();
  });
});

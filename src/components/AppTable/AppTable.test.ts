// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppTable from '@/components/AppTable/AppTable.vue';

describe('AppTable.vue', () => {
  it('Содержимое thead слота помещается между тегам thead', () => {
    const wrapper = mount({
      template: '<app-table><template #thead>thead data</template></app-table>',
      components: {
        'app-table': AppTable,
      },
    });

    expect(wrapper.find('thead').text()).toBe('thead data5');
    wrapper.unmount();
  });

  it('Содержимое tbody слота помещается между тегам tbody', () => {
    const wrapper = mount({
      template: '<app-table><template #tbody>tbody data</template></app-table>',
      components: {
        'app-table': AppTable,
      },
    });

    expect(wrapper.find('tbody').text()).toBe('tbody data');
    wrapper.unmount();
  });

  it('Содержимое default слота не отображается', () => {
    const wrapper = mount({
      template: '<app-table><span class="test"></span></app-table>',
      components: {
        'app-table': AppTable,
      },
    });

    expect(wrapper.find('.test').exists()).toBe(false);
    wrapper.unmount();
  });
});

// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import AppTabs from '@/components/AppTabs/AppTabs.vue';
import AppTabsItem from '@/components/AppTabs/AppTabsItem/AppTabsItem.vue';

describe('AppTabs.vue', () => {
  //   it('Количество кнопок = количеству app-tabs-item с атрибутом title', () => {
  //     const wrapper = mount({
  //       template: `
  //             <app-tabs>
  //                 <app-tabs-item title="Tab 1" />
  //                 <app-tabs-item />
  //             </app-tabs>
  //         `,
  //       components: {
  //         'app-tabs': AppTabs,
  //         'app-tabs-item': AppTabsItem,
  //       },
  //     });

  //     expect(wrapper.findAll('.tabs__navigation-item').length).toBe(1);
  //     wrapper.unmount();
  //   });

  it('currentTab', async () => {
    const wrapper = mount({
      template:
        '<app-tabs><app-tabs-item title="Первый таб" /><app-tabs-item title="Второй таб" active /></app-tabs>',
      components: {
        'app-tabs-item': AppTabsItem,
        'app-tabs': AppTabs,
      },
    });

    const wrapper2 = mount({
      template:
        '<app-tabs><app-tabs-item title="Первый таб" /><app-tabs-item title="Второй таб" /></app-tabs>',
      components: {
        'app-tabs-item': AppTabsItem,
        'app-tabs': AppTabs,
      },
    });

    await flushPromises();

    expect(wrapper.findAll('.tabs__navigation-item')[1].classes()).toEqual(
      expect.arrayContaining(['tabs__navigation-item--active'])
    );
    expect(wrapper2.findAll('.tabs__navigation-item')[0].classes()).toEqual(
      expect.arrayContaining(['tabs__navigation-item--active'])
    );

    wrapper.unmount();
    wrapper2.unmount();
  });

  it('onSelectItem', async () => {
    const wrapper = mount({
      template:
        '<app-tabs><app-tabs-item class="tab1" title="Первый таб" /><app-tabs-item class="tab2" title="Второй таб" /></app-tabs>',
      components: {
        'app-tabs-item': AppTabsItem,
        'app-tabs': AppTabs,
      },
    });

    await flushPromises();

    expect(wrapper.find('.tab1').attributes().style).not.toBe('display: none;');
    expect(wrapper.find('.tab2').attributes().style).toBe('display: none;');

    wrapper.findAll('.tabs__navigation-item')[1].trigger('click');

    await flushPromises();

    expect(wrapper.findAll('.tabs__navigation-item')[0].classes()).not.toEqual(
      expect.arrayContaining(['tabs__navigation-item--active'])
    );
    expect(wrapper.findAll('.tabs__navigation-item')[1].classes()).toEqual(
      expect.arrayContaining(['tabs__navigation-item--active'])
    );

    expect(wrapper.find('.tab1').attributes().style).toBe('display: none;');
    expect(wrapper.find('.tab2').attributes().style).not.toBe('display: none;');

    wrapper.unmount();
  });
});

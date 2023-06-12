import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Logo from '../Logo.vue'

describe('Logo Check', () => {
  it('Checks if renders properly', () => {
    const wrapper = mount(Logo)
    expect(wrapper.text()).toContain('To Do List');
  })
})

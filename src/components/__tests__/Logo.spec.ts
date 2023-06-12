import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppLogo from '../AppLogo.vue'

describe('Logo Check', () => {
  it('Checks if renders properly', () => {
    const wrapper = mount(AppLogo)
    expect(wrapper.text()).toContain('To Do List');
  })
})

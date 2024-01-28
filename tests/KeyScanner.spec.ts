import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import KeyScanner from '../components/KeyScanner.vue'

describe('KeyScanner default', () => {
  const wrapper = mount(KeyScanner)
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('has video element', () => {
    expect(wrapper.find('video').exists()).toBe(true)
  })

  it('show settings', () => {
    // not testable because dialog is hidden with css
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.find('dialog').classes()).toContain('modal')
    ////wrapper.findAll('button')[0].trigger('click')
    ////expect(wrapper.find('dialog').isVisible()).toBe(true)
  })

})
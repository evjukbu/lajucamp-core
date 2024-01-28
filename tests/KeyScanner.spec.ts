import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import KeyScanner from '../components/KeyScanner.vue'
const wrapper = mount(KeyScanner)

describe('KeyScanner', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('has video element', () => {
    expect(wrapper.find('video').exists()).toBe(true)
  })


})
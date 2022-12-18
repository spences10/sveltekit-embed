import Stackblitz from '$lib/components/stackblitz.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('Stackblitz', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(Stackblitz)
    expect(container).toBeTruthy()
  })
})

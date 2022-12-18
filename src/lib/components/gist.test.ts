import Gist from '$lib/components/gist.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('Gist', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(Gist)
    expect(container).toBeTruthy()
  })
})

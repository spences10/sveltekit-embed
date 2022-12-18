import CodePen from '$lib/components/code-pen.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('CodePen', () => {
  afterEach(() => cleanup())

  it('mounts', async () => {
    const { container } = render(CodePen)
    expect(container).toBeTruthy()
  })
})

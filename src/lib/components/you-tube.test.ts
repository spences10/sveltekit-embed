import YouTube from '$lib/components/you-tube.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('YouTube', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(YouTube)
		expect(container).toBeTruthy()
	})
})

import SimpleCast from '$lib/components/simple-cast.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('SimpleCast', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(SimpleCast)
		expect(container).toBeTruthy()
	})
})

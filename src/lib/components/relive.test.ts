import Relive from '$lib/components/relive.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('Relive', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(Relive)
		expect(container).toBeTruthy()
	})
})

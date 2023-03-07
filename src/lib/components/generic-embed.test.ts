import GenericEmbed from '$lib/components/generic-embed.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IntersectionObserver = vi.fn(() => ({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
})) as unknown as typeof globalThis.IntersectionObserver

describe('GenericEmbed', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(GenericEmbed)
		expect(container).toBeTruthy()
	})
})

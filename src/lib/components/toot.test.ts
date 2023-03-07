import Toot from '$lib/components/toot.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

describe('Toot', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(Toot)
		expect(container).toBeTruthy()
	})
})

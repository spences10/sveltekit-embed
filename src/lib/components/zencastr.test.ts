import Zencastr from '$lib/components/zencastr.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

describe('Zencastr', () => {
	afterEach(() => cleanup())

	it('mounts', () => {
		const { container } = render(Zencastr)
		expect(container).toBeTruthy()
	})
})

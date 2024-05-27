import Toot from '$lib/components/toot.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

describe('Toot', () => {
	afterEach(() => cleanup())

	it('renders iframe with correct src', async () => {
		const instance = 'my-instance'
		const username = 'my-username'
		const tootId = '123'

		const { getByTitle } = render(Toot, {
			instance,
			username,
			tootId,
		})
		const iframe = getByTitle('')

		const expected_src = `https://${instance}/@${username}/123/embed`
		expect(iframe.getAttribute('src')).toBe(expected_src)
	})

	it('renders with a default width', async () => {
		const instance = 'my-instance'
		const username = 'my-username'
		const tootId = '123'

		const { container } = render(Toot, {
			instance,
			username,
			tootId,
		})
		const iframe = container.querySelector('iframe')

		if (iframe) {
			expect(iframe.getAttribute('width')).toBe('400')
		}
	})
})

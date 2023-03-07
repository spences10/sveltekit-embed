import AnchorFm from '$lib/components/anchor-fm.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

let episodeUrl =
	'purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a'

describe('AnchorFm', () => {
	afterEach(() => cleanup())

	it('mounts with episode url', async () => {
		const { container } = render(AnchorFm, {
			episodeUrl,
			disable_observer: true,
		})
		expect(container).toBeTruthy()
	})

	it('renders iframe with episode url', async () => {
		const { getByTestId } = render(AnchorFm, {
			episodeUrl,
			disable_observer: true,
		})
		const iframe = getByTestId('anchor-fm-episode')
		const expectedSrc = `https://anchor.fm/${episodeUrl}`
		expect(iframe.getAttribute('src')).toBe(expectedSrc)
	})

	it('sets iframe dimensions based on props', async () => {
		const height = '200'
		const width = '75'
		const { getByTestId } = render(AnchorFm, {
			episodeUrl,
			height,
			width,
			disable_observer: true,
		})
		const iframe = getByTestId('anchor-fm-episode')
		expect(iframe.getAttribute('height')).toBe(height)
		expect(iframe.getAttribute('width')).toBe(`${width}`)
	})
})

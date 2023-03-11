import Deezer from '$lib/components/deezer.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

const theme = 'auto'
const frameSrc = 'track/1366751722'
const height = '300px'
const width = '100%'

describe('Deezer', () => {
	afterEach(() => cleanup())

	it('mounts with default props', async () => {
		const { container } = render(Deezer)
		expect(container).toBeTruthy()
	})

	it('renders iframe with correct src', async () => {
		const { getByTitle } = render(Deezer, {
			theme,
			frameSrc,
			height,
			width,
			disable_observer: true,
		})
		const iframe = getByTitle('deezer-widget')
		const expected_src = `https://widget.deezer.com/widget/${theme}/${frameSrc}`
		expect(iframe.getAttribute('src')).toBe(expected_src)
	})

	it('mounts with custom height and width', async () => {
		const { container } = render(Deezer, {
			theme,
			frameSrc,
			height: '200px',
			width: '50%',
			disable_observer: true,
		})
		const iframe = container.querySelector('iframe')

		expect(iframe.getAttribute('style')).toContain(`height: 200px`)
		expect(iframe.getAttribute('style')).toContain(`width: 50%`)
	})

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Deezer, {
			theme,
			frameSrc,
			disable_observer: false,
		})
		const general_observer = getByTestId('general-observer')
		expect(general_observer).toBeTruthy()
	})
})

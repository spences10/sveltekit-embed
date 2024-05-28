import Vimeo from '$lib/components/vimeo.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('Vimeo', () => {
	afterEach(() => cleanup());

	it('mounts with default values', async () => {
		const { container } = render(Vimeo, {
			vimeoId: '123456789',
			disable_observer: true,
		});

		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const vimeoId = '987654321';
		const { getByTitle } = render(Vimeo, {
			vimeoId,
			autoPlay: true,
			aspectRatio: '4:3',
			skipTo: { h: 1, m: 23, s: 45 },
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=true#t=1h23m45s`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom aspect ratio', async () => {
		const { container } = render(Vimeo, {
			vimeoId: '123456789',
			aspectRatio: '1:1',
			disable_observer: true,
		});
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		expect(wrapper?.getAttribute('style')).toContain(
			'padding-top: 100%;',
		);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Vimeo, {
			vimeoId: '123456789',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');

		expect(general_observer).toBeTruthy();
	});
});

import AnchorFm from '$lib/components/anchor-fm.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

let episodeUrl =
	'purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a';

describe('AnchorFm', () => {
	afterEach(() => cleanup());

	it('mounts with episode url', async () => {
		const { container } = render(AnchorFm, {
			episodeUrl,
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with episode url', async () => {
		const { getByTestId } = render(AnchorFm, {
			episodeUrl,
			disable_observer: true,
		});
		const iframe = getByTestId('anchor-fm-episode');
		const expected_src = `https://anchor.fm/${episodeUrl}`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(AnchorFm, {
			episodeUrl,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('200px');
		expect(iframe?.parentElement?.style.width).toBe('50%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(AnchorFm, {
			episodeUrl,
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

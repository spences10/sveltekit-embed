import SimpleCast from '$lib/components/simple-cast.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('SimpleCast', () => {
	afterEach(cleanup);

	it('mounts with default props', async () => {
		const { container } = render(SimpleCast);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const episodeId = '12345';
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(SimpleCast, {
			episodeId: '67890',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

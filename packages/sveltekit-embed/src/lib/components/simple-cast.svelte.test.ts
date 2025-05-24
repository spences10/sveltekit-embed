import SimpleCast from '$lib/components/simple-cast.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

describe('SimpleCast', () => {
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
		await expect.element(iframe).toHaveAttribute('src', expected_src);
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

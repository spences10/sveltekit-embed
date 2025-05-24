import SoundCloud from '$lib/components/sound-cloud.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('SoundCloud', () => {
	it('mounts with soundcloud link', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with soundcloud link', async () => {
		const soundcloudLink =
			'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001';
		const { getByTitle } = render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = getByTitle(`soundcloud-${soundcloudLink}`);
		const expected_src = `https://w.soundcloud.com/player/?url=${soundcloudLink}&visual=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('height')).toBe('200px');
			expect(iframe.getAttribute('width')).toBe('50%');
		}
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(SoundCloud, {
			soundcloudLink:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

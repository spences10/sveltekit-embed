import Spotify from '$lib/components/spotify.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

describe('Spotify', () => {
	it('mounts with default props', async () => {
		const { container } = render(Spotify);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const spotifyLink = 'playlist/37i9dQZF1E4ZoJ6VjC6TJL';
		const { getByTestId } = render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotifyLink}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Spotify, {
			spotifyLink: 'album/0yL5CjKtIVrWtLZnFJHfjz',
			height: '300px',
			width: '80%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.style.height).toBe('300px');
		expect(iframe?.style.width).toBe('80%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Spotify, {
			spotifyLink: 'artist/2ye2Wgw4gimLv2eAKyk1NB',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

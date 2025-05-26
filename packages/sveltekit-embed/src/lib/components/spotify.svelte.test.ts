import Spotify from '$lib/components/spotify.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Spotify', () => {
	it('mounts with spotify link', async () => {
		const { container } = render(Spotify, {
			spotifyLink: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with spotify link', async () => {
		const spotifyLink = 'track/4uLU6hMCjMI75M1A2tKUQC';
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotifyLink}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with a GeneralObserver', async () => {
		render(Spotify, {
			spotifyLink: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty spotifyLink gracefully', async () => {
		render(Spotify, {
			spotifyLink: '',
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = 'https://open.spotify.com/embed/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default height and width when not provided', async () => {
		render(Spotify, {
			spotifyLink: 'track/test',
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		await expect
			.element(iframe)
			.toHaveAttribute('title', 'spotify-track/test');
		await expect.element(iframe).toHaveAttribute('frameBorder', '0');
		await expect
			.element(iframe)
			.toHaveAttribute('allow', 'encrypted-media');
		expect(iframeElement.style.borderRadius).toContain('0.8rem');
	});

	it('should construct proper Spotify embed URL', async () => {
		const spotifyLink = 'playlist/37i9dQZF1DXcBWIGoYBM5M';
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotifyLink}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('should handle different Spotify content types', async () => {
		// Test track
		const { getByTestId: getTrack } = render(Spotify, {
			spotifyLink: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: true,
		});
		const trackIframe = getTrack('spotify');
		await expect
			.element(trackIframe)
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
			);

		// Test album
		const { getByTestId: getAlbum } = render(Spotify, {
			spotifyLink: 'album/1DFixLWuPkv3KT3TnV35m3',
			disable_observer: true,
		});
		const albumIframe = getAlbum('spotify');
		await expect
			.element(albumIframe)
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3',
			);

		// Test playlist
		const { getByTestId: getPlaylist } = render(Spotify, {
			spotifyLink: 'playlist/37i9dQZF1DXcBWIGoYBM5M',
			disable_observer: true,
		});
		const playlistIframe = getPlaylist('spotify');
		await expect
			.element(playlistIframe)
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
			);

		// Test artist
		const { getByTestId: getArtist } = render(Spotify, {
			spotifyLink: 'artist/4NHQUGzhtTLFvgF5SZesLK',
			disable_observer: true,
		});
		const artistIframe = getArtist('spotify');
		await expect
			.element(artistIframe)
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/artist/4NHQUGzhtTLFvgF5SZesLK',
			);
	});

	it('should handle special characters in spotifyLink', async () => {
		const spotifyLink = 'track/abc123_def-456';
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotifyLink}`,
			);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `spotify-${spotifyLink}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const spotifyLink = 'track/accessibility-test';
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');

		await expect
			.element(iframe)
			.toHaveAttribute('title', `spotify-${spotifyLink}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', '0');
		await expect
			.element(iframe)
			.toHaveAttribute('allow', 'encrypted-media');
		await expect
			.element(iframe)
			.toHaveClass('spotify-sveltekit-embed');
	});

	it('should handle very long spotifyLink values', async () => {
		const spotifyLink = 'track/' + 'a'.repeat(100);
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotifyLink}`,
			);
	});

	it('should apply custom styles correctly', async () => {
		const customStyles = 'border: 2px solid red; background: blue;';
		render(Spotify, {
			spotifyLink: 'track/test',
			iframe_styles: customStyles,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		expect(iframeElement.style.cssText).toContain(
			'border: 2px solid red',
		);
		expect(iframeElement.style.cssText).toContain('background: blue');
	});

	it('should handle custom dimensions', async () => {
		render(Spotify, {
			spotifyLink: 'track/test',
			width: '500px',
			height: '300px',
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		// Default iframe_styles should incorporate custom dimensions
		expect(iframeElement.style.cssText).toContain('height: 300px');
		expect(iframeElement.style.cssText).toContain('width: 500px');
	});

	it('should handle malformed Spotify links gracefully', async () => {
		const spotifyLink = 'invalid/content/with/extra/slashes';
		render(Spotify, {
			spotifyLink,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');

		// Component should still render, even if link is malformed
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotifyLink}`,
			);
	});

	it('should render with proper CSS class structure', async () => {
		render(Spotify, {
			spotifyLink: 'track/test',
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');

		await expect
			.element(iframe)
			.toHaveClass('spotify-sveltekit-embed');
	});

	it.skip('should handle Spotify link variations', async () => {
		// Test with query parameters
		const linkWithParams = 'track/4uLU6hMCjMI75M1A2tKUQC?si=abc123';
		const { getByTestId: getWithParams } = render(Spotify, {
			spotifyLink: linkWithParams,
			disable_observer: true,
		});
		const paramsIframe = getWithParams('spotify');
		await expect
			.element(paramsIframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${linkWithParams}`,
			);

		// Test with just ID (no type prefix)
		const justId = '4uLU6hMCjMI75M1A2tKUQC';
		const { getByTestId: getJustId } = render(Spotify, {
			spotifyLink: justId,
			disable_observer: true,
		});
		const idIframe = getJustId('spotify');
		await expect
			.element(idIframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${justId}`,
			);
	});
});

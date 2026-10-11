import Spotify from './spotify.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Spotify', () => {
	it('mounts with spotify link', async () => {
		const { container } = await render(Spotify, {
			spotify_link: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with spotify link', async () => {
		const spotify_link = 'track/4uLU6hMCjMI75M1A2tKUQC';
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotify_link}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with a GeneralObserver', async () => {
		await render(Spotify, {
			spotify_link: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty spotify_link gracefully', async () => {
		await render(Spotify, {
			spotify_link: '',
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = 'https://open.spotify.com/embed/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default height and width when not provided', async () => {
		await render(Spotify, {
			spotify_link: 'track/test',
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
		const spotify_link = 'playlist/37i9dQZF1DXcBWIGoYBM5M';
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		const expected_src = `https://open.spotify.com/embed/${spotify_link}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('should handle different Spotify content types', async () => {
		// Test track
		await render(Spotify, {
			spotify_link: 'track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
			);

		// Test album
		await render(Spotify, {
			spotify_link: 'album/1DFixLWuPkv3KT3TnV35m3',
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3',
			);

		// Test playlist
		await render(Spotify, {
			spotify_link: 'playlist/37i9dQZF1DXcBWIGoYBM5M',
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
			);

		// Test artist
		await render(Spotify, {
			spotify_link: 'artist/4NHQUGzhtTLFvgF5SZesLK',
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				'https://open.spotify.com/embed/artist/4NHQUGzhtTLFvgF5SZesLK',
			);
	});

	it('should handle special characters in spotify_link', async () => {
		const spotify_link = 'track/abc123_def-456';
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotify_link}`,
			);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `spotify-${spotify_link}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const spotify_link = 'track/accessibility-test';
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');

		await expect
			.element(iframe)
			.toHaveAttribute('title', `spotify-${spotify_link}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', '0');
		await expect
			.element(iframe)
			.toHaveAttribute('allow', 'encrypted-media');
		await expect
			.element(iframe)
			.toHaveClass('spotify-sveltekit-embed');
	});

	it('should handle very long spotify_link values', async () => {
		const spotify_link = 'track/' + 'a'.repeat(100);
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotify_link}`,
			);
	});

	it('should apply custom styles correctly', async () => {
		const customStyles = 'border: 2px solid red; background: blue;';
		await render(Spotify, {
			spotify_link: 'track/test',
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
		await render(Spotify, {
			spotify_link: 'track/test',
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
		const spotify_link = 'invalid/content/with/extra/slashes';
		await render(Spotify, {
			spotify_link,
			disable_observer: true,
		});
		const iframe = page.getByTestId('spotify');

		// Component should still render, even if link is malformed
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${spotify_link}`,
			);
	});

	it('should render with proper CSS class structure', async () => {
		await render(Spotify, {
			spotify_link: 'track/test',
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
		await render(Spotify, {
			spotify_link: linkWithParams,
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${linkWithParams}`,
			);

		// Test with just ID (no type prefix)
		const justId = '4uLU6hMCjMI75M1A2tKUQC';
		await render(Spotify, {
			spotify_link: justId,
			disable_observer: true,
		});
		await expect
			.element(page.getByTestId('spotify'))
			.toHaveAttribute(
				'src',
				`https://open.spotify.com/embed/${justId}`,
			);
	});
});

import SoundCloud from '$lib/components/sound-cloud.svelte';
import { page } from '@vitest/browser/context';
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
		render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`soundcloud-${soundcloudLink}`);
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
		render(SoundCloud, {
			soundcloudLink:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty soundcloudLink gracefully', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink: '',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toBe(
			'https://w.soundcloud.com/player/?url=&visual=true',
		);
	});

	it('should apply default height and width when not provided', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink: 'https://soundcloud.com/test/track',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();

		expect(iframe?.getAttribute('width')).toBe('100%');
		expect(iframe?.getAttribute('height')).toBe('300px');
		expect(iframe?.getAttribute('scrolling')).toBe('false');
		expect(iframe?.getAttribute('frameborder')).toBe('0');
		expect(iframe?.getAttribute('allow')).toBe('autoplay');
	});

	it('should construct proper SoundCloud player URL', async () => {
		const soundcloudLink = 'https://soundcloud.com/artist/track-name';
		const { container } = render(SoundCloud, {
			soundcloudLink,
			showVisual: false,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toBe(
			`https://w.soundcloud.com/player/?url=${soundcloudLink}&visual=false`,
		);
	});

	it('should handle special characters in soundcloudLink', async () => {
		const soundcloudLink =
			'https://soundcloud.com/artist/track-with-symbols_123';
		render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`soundcloud-${soundcloudLink}`);
		const expected_src = `https://w.soundcloud.com/player/?url=${soundcloudLink}&visual=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const soundcloudLink =
			'https://soundcloud.com/test/accessibility';
		const { container } = render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(
			`soundcloud-${soundcloudLink}`,
		);
		expect(iframe?.getAttribute('frameborder')).toBe('0');
		expect(iframe?.getAttribute('scrolling')).toBe('false');
		expect(iframe?.getAttribute('allow')).toBe('autoplay');
	});

	it('should handle very long soundcloudLink values', async () => {
		const soundcloudLink =
			'https://soundcloud.com/artist/' + 'a'.repeat(100);
		const { container } = render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain('https://w.soundcloud.com/player/?url=');
		expect(src).toContain(soundcloudLink);
	});

	it('should apply visual parameter correctly', async () => {
		const soundcloudLink = 'https://soundcloud.com/test/track';

		// Test visual=true
		const { container: visualContainer } = render(SoundCloud, {
			soundcloudLink,
			showVisual: true,
			disable_observer: true,
		});
		const visualIframe = visualContainer.querySelector('iframe');
		expect(visualIframe?.getAttribute('src')).toContain(
			'visual=true',
		);

		// Test visual=false
		const { container: noVisualContainer } = render(SoundCloud, {
			soundcloudLink,
			showVisual: false,
			disable_observer: true,
		});
		const noVisualIframe = noVisualContainer.querySelector('iframe');
		expect(noVisualIframe?.getAttribute('src')).toContain(
			'visual=false',
		);
	});

	it('should handle numeric height and width values', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink: 'https://soundcloud.com/test/track',
			width: '500',
			height: '400',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('width')).toBe('500');
		expect(iframe?.getAttribute('height')).toBe('400');
	});

	it('should handle malformed SoundCloud links gracefully', async () => {
		const soundcloudLink = 'not-a-valid-url/with/problems';
		const { container } = render(SoundCloud, {
			soundcloudLink,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		// Component should still render, even if URL is malformed
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain(soundcloudLink);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = render(SoundCloud, {
			soundcloudLink: 'https://soundcloud.com/test/track',
			iframe_styles: 'border: 1px solid red;',
			disable_observer: true,
		});

		const iframe = container.querySelector('iframe');
		expect(iframe?.style.cssText).toContain('border: 1px solid red;');
	});

	it('should handle different SoundCloud content types', async () => {
		// Test track URL
		const trackLink = 'https://soundcloud.com/artist/track-name';
		const { container: trackContainer } = render(SoundCloud, {
			soundcloudLink: trackLink,
			disable_observer: true,
		});
		const trackIframe = trackContainer.querySelector('iframe');
		expect(trackIframe?.getAttribute('src')).toContain(trackLink);

		// Test playlist URL
		const playlistLink =
			'https://soundcloud.com/artist/sets/playlist-name';
		const { container: playlistContainer } = render(SoundCloud, {
			soundcloudLink: playlistLink,
			disable_observer: true,
		});
		const playlistIframe = playlistContainer.querySelector('iframe');
		expect(playlistIframe?.getAttribute('src')).toContain(
			playlistLink,
		);

		// Test user profile URL
		const userLink = 'https://soundcloud.com/username';
		const { container: userContainer } = render(SoundCloud, {
			soundcloudLink: userLink,
			disable_observer: true,
		});
		const userIframe = userContainer.querySelector('iframe');
		expect(userIframe?.getAttribute('src')).toContain(userLink);
	});

	it('should handle SoundCloud URL variations', async () => {
		// Test short URL
		const shortLink = 'https://on.soundcloud.com/abc123';
		const { container: shortContainer } = render(SoundCloud, {
			soundcloudLink: shortLink,
			disable_observer: true,
		});
		const shortIframe = shortContainer.querySelector('iframe');
		expect(shortIframe?.getAttribute('src')).toContain(shortLink);

		// Test URL with query parameters
		const urlWithParams = 'https://soundcloud.com/artist/track?t=30s';
		const { container: paramsContainer } = render(SoundCloud, {
			soundcloudLink: urlWithParams,
			disable_observer: true,
		});
		const paramsIframe = paramsContainer.querySelector('iframe');
		expect(paramsIframe?.getAttribute('src')).toContain(
			urlWithParams,
		);

		// Test mobile URL
		const mobileUrl = 'https://m.soundcloud.com/artist/track';
		const { container: mobileContainer } = render(SoundCloud, {
			soundcloudLink: mobileUrl,
			disable_observer: true,
		});
		const mobileIframe = mobileContainer.querySelector('iframe');
		expect(mobileIframe?.getAttribute('src')).toContain(mobileUrl);
	});
});

import SoundCloud from './sound-cloud.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('SoundCloud', () => {
	it('mounts with soundcloud link', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with soundcloud link', async () => {
		const soundcloud_link =
			'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001';
		await render(SoundCloud, {
			soundcloud_link,
		});
		const iframe = page.getByTitle(`soundcloud-${soundcloud_link}`);
		const expected_src = `https://w.soundcloud.com/player/?url=${soundcloud_link}&visual=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
			height: '200px',
			width: '50%',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('height')).toBe('200px');
			expect(iframe.getAttribute('width')).toBe('50%');
		}
	});

	it('lazy loads the iframe by default', async () => {
		await render(SoundCloud, {
			soundcloud_link:
				'https://soundcloud.com/mau5trap/deadmau5-bad-at-titles-episode-001',
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty soundcloud_link gracefully', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link: '',
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toBe(
			'https://w.soundcloud.com/player/?url=&visual=true',
		);
	});

	it('should apply default height and width when not provided', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link: 'https://soundcloud.com/test/track',
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
		const soundcloud_link =
			'https://soundcloud.com/artist/track-name';
		const { container } = await render(SoundCloud, {
			soundcloud_link,
			show_visual: false,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toBe(
			`https://w.soundcloud.com/player/?url=${soundcloud_link}&visual=false`,
		);
	});

	it('should handle special characters in soundcloud_link', async () => {
		const soundcloud_link =
			'https://soundcloud.com/artist/track-with-symbols_123';
		await render(SoundCloud, {
			soundcloud_link,
		});
		const iframe = page.getByTitle(`soundcloud-${soundcloud_link}`);
		const expected_src = `https://w.soundcloud.com/player/?url=${soundcloud_link}&visual=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const soundcloud_link =
			'https://soundcloud.com/test/accessibility';
		const { container } = await render(SoundCloud, {
			soundcloud_link,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(
			`soundcloud-${soundcloud_link}`,
		);
		expect(iframe?.getAttribute('frameborder')).toBe('0');
		expect(iframe?.getAttribute('scrolling')).toBe('false');
		expect(iframe?.getAttribute('allow')).toBe('autoplay');
	});

	it('should handle very long soundcloud_link values', async () => {
		const soundcloud_link =
			'https://soundcloud.com/artist/' + 'a'.repeat(100);
		const { container } = await render(SoundCloud, {
			soundcloud_link,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain('https://w.soundcloud.com/player/?url=');
		expect(src).toContain(soundcloud_link);
	});

	it('should apply visual parameter correctly', async () => {
		const soundcloud_link = 'https://soundcloud.com/test/track';

		// Test visual=true
		const { container: visualContainer } = await render(SoundCloud, {
			soundcloud_link,
			show_visual: true,
		});
		const visualIframe = visualContainer.querySelector('iframe');
		expect(visualIframe?.getAttribute('src')).toContain(
			'visual=true',
		);

		// Test visual=false
		const { container: noVisualContainer } = await render(
			SoundCloud,
			{
				soundcloud_link,
				show_visual: false,
			},
		);
		const noVisualIframe = noVisualContainer.querySelector('iframe');
		expect(noVisualIframe?.getAttribute('src')).toContain(
			'visual=false',
		);
	});

	it('should handle numeric height and width values', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link: 'https://soundcloud.com/test/track',
			width: '500',
			height: '400',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('width')).toBe('500');
		expect(iframe?.getAttribute('height')).toBe('400');
	});

	it('should handle malformed SoundCloud links gracefully', async () => {
		const soundcloud_link = 'not-a-valid-url/with/problems';
		const { container } = await render(SoundCloud, {
			soundcloud_link,
		});
		const iframe = container.querySelector('iframe');

		// Component should still render, even if URL is malformed
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain(soundcloud_link);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = await render(SoundCloud, {
			soundcloud_link: 'https://soundcloud.com/test/track',
			iframe_styles: 'border: 1px solid red;',
		});

		const iframe = container.querySelector('iframe');
		expect(iframe?.style.cssText).toContain('border: 1px solid red;');
	});

	it('should handle different SoundCloud content types', async () => {
		// Test track URL
		const trackLink = 'https://soundcloud.com/artist/track-name';
		const { container: trackContainer } = await render(SoundCloud, {
			soundcloud_link: trackLink,
		});
		const trackIframe = trackContainer.querySelector('iframe');
		expect(trackIframe?.getAttribute('src')).toContain(trackLink);

		// Test playlist URL
		const playlistLink =
			'https://soundcloud.com/artist/sets/playlist-name';
		const { container: playlistContainer } = await render(
			SoundCloud,
			{
				soundcloud_link: playlistLink,
			},
		);
		const playlistIframe = playlistContainer.querySelector('iframe');
		expect(playlistIframe?.getAttribute('src')).toContain(
			playlistLink,
		);

		// Test user profile URL
		const userLink = 'https://soundcloud.com/username';
		const { container: userContainer } = await render(SoundCloud, {
			soundcloud_link: userLink,
		});
		const userIframe = userContainer.querySelector('iframe');
		expect(userIframe?.getAttribute('src')).toContain(userLink);
	});

	it('should handle SoundCloud URL variations', async () => {
		// Test short URL
		const shortLink = 'https://on.soundcloud.com/abc123';
		const { container: shortContainer } = await render(SoundCloud, {
			soundcloud_link: shortLink,
		});
		const shortIframe = shortContainer.querySelector('iframe');
		expect(shortIframe?.getAttribute('src')).toContain(shortLink);

		// Test URL with query parameters
		const urlWithParams = 'https://soundcloud.com/artist/track?t=30s';
		const { container: paramsContainer } = await render(SoundCloud, {
			soundcloud_link: urlWithParams,
		});
		const paramsIframe = paramsContainer.querySelector('iframe');
		expect(paramsIframe?.getAttribute('src')).toContain(
			urlWithParams,
		);

		// Test mobile URL
		const mobileUrl = 'https://m.soundcloud.com/artist/track';
		const { container: mobileContainer } = await render(SoundCloud, {
			soundcloud_link: mobileUrl,
		});
		const mobileIframe = mobileContainer.querySelector('iframe');
		expect(mobileIframe?.getAttribute('src')).toContain(mobileUrl);
	});
});

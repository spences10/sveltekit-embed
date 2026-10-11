import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import TikTok from './tiktok.svelte';

describe('TikTok', () => {
	it('mounts with default props', async () => {
		const { container } = await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const tiktok_id = '7234660647688875814';
		await render(TikTok, {
			tiktok_id,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		expect(src).toContain(
			`https://www.tiktok.com/player/v1/${tiktok_id}?`,
		);
		expect(src).toContain('controls=1');
		expect(src).toContain('progress_bar=1');
	});

	it('renders with custom configurations', async () => {
		const tiktok_id = '7234660647688875814';
		await render(TikTok, {
			tiktok_id,
			controls: false,
			autoplay: true,
			loop: true,
			music_info: true,
			description: true,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		expect(src).toContain('controls=0');
		expect(src).toContain('autoplay=1');
		expect(src).toContain('loop=1');
		expect(src).toContain('music_info=1');
		expect(src).toContain('description=1');
	});

	it('renders with a GeneralObserver', async () => {
		await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty tiktok_id gracefully', async () => {
		await render(TikTok, {
			tiktok_id: '',
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');
		expect(src).toContain('https://www.tiktok.com/player/v1/?');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');

		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'allow',
				'encrypted-media; picture-in-picture; fullscreen',
			);

		const embedDiv = container.querySelector(
			'.tiktok-sveltekit-embed',
		);
		expect(embedDiv).toBeTruthy();
		const styles = (embedDiv as HTMLElement)?.style;
		expect(styles?.width).toBe('100%');
		expect(styles?.height).toBe('600px');
	});

	it('should construct proper TikTok player URL', async () => {
		const tiktok_id = '1234567890123456789';
		await render(TikTok, {
			tiktok_id,
			controls: true,
			autoplay: false,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		expect(src).toContain(
			`https://www.tiktok.com/player/v1/${tiktok_id}?`,
		);
		expect(src).toContain('controls=1');
		expect(src).toContain('autoplay=0');
	});

	it('should handle special characters in tiktok_id', async () => {
		const tiktok_id = 'abc123_def-456';
		await render(TikTok, {
			tiktok_id,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');

		await expect
			.element(iframe)
			.toHaveAttribute('title', `tiktok-${tiktok_id}`);
		const src = iframe.element().getAttribute('src');
		expect(src).toContain(tiktok_id);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const tiktok_id = 'accessibility-test';
		await render(TikTok, {
			tiktok_id,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');

		await expect
			.element(iframe)
			.toHaveAttribute('title', `tiktok-${tiktok_id}`);
		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'allow',
				'encrypted-media; picture-in-picture; fullscreen',
			);
	});

	it('should handle very long tiktok_id values', async () => {
		const tiktok_id = '1'.repeat(50);
		await render(TikTok, {
			tiktok_id,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		expect(src).toContain(tiktok_id);
	});

	it('should apply custom dimensions correctly', async () => {
		const { container } = await render(TikTok, {
			tiktok_id: '7234660647688875814',
			width: '500px',
			height: '400px',
			disable_observer: true,
		});

		const embedDiv = container.querySelector(
			'.tiktok-sveltekit-embed',
		);
		expect(embedDiv).toBeTruthy();
		const styles = (embedDiv as HTMLElement)?.style;
		expect(styles?.width).toBe('500px');
		expect(styles?.height).toBe('400px');
	});

	it('should handle boolean control options correctly', async () => {
		await render(TikTok, {
			tiktok_id: '7234660647688875814',
			controls: false,
			progress_bar: false,
			play_button: false,
			volume_control: false,
			fullscreen_button: false,
			timestamp: false,
			loop: true,
			autoplay: true,
			music_info: true,
			description: true,
			rel: false,
			native_context_menu: false,
			closed_caption: false,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		expect(src).toContain('controls=0');
		expect(src).toContain('progress_bar=0');
		expect(src).toContain('play_button=0');
		expect(src).toContain('volume_control=0');
		expect(src).toContain('fullscreen_button=0');
		expect(src).toContain('timestamp=0');
		expect(src).toContain('loop=1');
		expect(src).toContain('autoplay=1');
		expect(src).toContain('music_info=1');
		expect(src).toContain('description=1');
		expect(src).toContain('rel=0');
		expect(src).toContain('native_context_menu=0');
		expect(src).toContain('closed_caption=0');
	});

	it('should handle malformed tiktok_id gracefully', async () => {
		const tiktok_id = 'invalid/id/with/slashes';
		await render(TikTok, {
			tiktok_id,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');

		// Component should still render, even if ID is malformed
		const src = iframe.element().getAttribute('src');
		expect(src).toContain(tiktok_id);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: true,
		});

		const embedDiv = container.querySelector(
			'.tiktok-sveltekit-embed',
		);
		expect(embedDiv).toBeTruthy();
		expect(embedDiv?.className).toBe('tiktok-sveltekit-embed');
	});

	it.skip('should handle different TikTok content formats', async () => {
		// Test standard video ID
		await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: true,
		});
		const standardIframe = page.getByTestId('tiktok-embed');
		expect(standardIframe.element().getAttribute('src')).toContain(
			'7234660647688875814',
		);

		// Test different ID format
		await render(TikTok, {
			tiktok_id: '6982674499405171973',
			disable_observer: true,
		});
		const differentIframe = page.getByTestId('tiktok-embed');
		expect(differentIframe.element().getAttribute('src')).toContain(
			'6982674499405171973',
		);
	});

	it.skip('should handle query parameter construction correctly', async () => {
		await render(TikTok, {
			tiktok_id: '7234660647688875814',
			controls: true,
			progress_bar: false,
			autoplay: true,
			loop: false,
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const src = iframe.element().getAttribute('src');

		// Check that all parameters are included with correct values
		expect(src).toContain('controls=1');
		expect(src).toContain('progress_bar=0');
		expect(src).toContain('autoplay=1');
		expect(src).toContain('loop=0');

		// Check that URL is properly formatted
		expect(src).toMatch(
			/^https:\/\/www\.tiktok\.com\/player\/v1\/7234660647688875814\?.*controls=1.*progress_bar=0.*autoplay=1.*loop=0/,
		);
	});

	it('should apply iframe positioning styles correctly', async () => {
		await render(TikTok, {
			tiktok_id: '7234660647688875814',
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');
		const iframeElement = iframe.element() as HTMLIFrameElement;
		const styles = iframeElement.style;

		expect(styles.position).toBe('absolute');
		expect(styles.top).toBe('0px');
		expect(styles.left).toBe('0px');
		expect(styles.width).toBe('100%');
		expect(styles.height).toBe('100%');
	});

	it('should update the iframe when props change', async () => {
		const { rerender } = await render(TikTok, {
			tiktok_id: '1111111111',
			disable_observer: true,
		});
		const iframe = page.getByTestId('tiktok-embed');

		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/player/v1/1111111111?'),
			);

		await rerender({ tiktok_id: '2222222222', loop: true });

		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/player/v1/2222222222?'),
			);
		await expect
			.element(iframe)
			.toHaveAttribute('src', expect.stringContaining('loop=1'));
	});
});

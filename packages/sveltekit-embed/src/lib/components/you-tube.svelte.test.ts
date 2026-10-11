import YouTube from './you-tube.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('YouTube', () => {
	it('mounts with video id', async () => {
		const { container } = await render(YouTube, {
			youtube_id: 'abc123',
			list_id: '',
			autoplay: false,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '16:9',
			iframe_styles: '',
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src for video with default options', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			list_id: '',
			autoplay: false,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '16:9',
			iframe_styles: '',
		});
		const iframe = page.getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for video with custom options', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			list_id: '',
			autoplay: true,
			mute: true,
			controls: false,
			loop: true,
			modest_branding: true,
			rel: true,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '16:9',
			iframe_styles: '',
		});
		const iframe = page.getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=1&start=0&mute=1&controls=0&loop=1&modestbranding=1&rel=1`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for playlist with default options', async () => {
		const list_id = '123abc';
		await render(YouTube, {
			youtube_id: '',
			list_id,
			autoplay: false,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '16:9',
			iframe_styles: '',
		});
		const iframe = page.getByTitle(`youTube-${list_id}`);
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${list_id}&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('sets aspect ratio using padding-top style', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			list_id: '',
			autoplay: false,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '4:3',
			iframe_styles: 'border-radius: 0.8rem;',
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element();
		const iframeWrapper = iframeElement.parentElement;

		expect(iframeWrapper?.getAttribute('style')).toContain(
			'padding-top: 75%;',
		);
	});

	it('renders with a GeneralObserver', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			list_id: '',
			autoplay: false,
			skip_to: { h: 0, m: 0, s: 0 },
			aspect_ratio: '16:9',
			iframe_styles: '',
		});
		const iframe = page.getByTestId('youTube');
		await expect.element(iframe).toHaveAttribute('loading', 'lazy');
	});

	it('loads eagerly when asked to', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			loading: 'eager',
		});
		const iframe = page.getByTestId('youTube');
		await expect.element(iframe).toHaveAttribute('loading', 'eager');
	});

	it('renders the iframe without an observer wrapper', async () => {
		const { container } = await render(YouTube, {
			youtube_id: 'abc123',
		});
		expect(
			container.querySelector('[data-testid="general-observer"]'),
		).toBeNull();
		expect(container.querySelector('iframe')).not.toBeNull();
	});

	// Coverage gaps - test stubs to implement
	it('should calculate correct start time with complex skip_to values', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			skip_to: { h: 1, m: 30, s: 45 },
		});
		const iframe = page.getByTitle('youTube-abc123');

		// 1 hour = 3600 seconds, 30 minutes = 1800 seconds, 45 seconds = 45 seconds
		// Total: 3600 + 1800 + 45 = 5445 seconds
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=5445&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle invalid skip_to values gracefully', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			skip_to: { h: -1, m: -30, s: -45 },
		});
		const iframe = page.getByTitle('youTube-abc123');

		// Negative values should result in negative start time (-5445)
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=-5445&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it.skip('should handle both youtube_id and list_id provided', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			list_id: 'playlist456',
		});
		const iframe = page.getByTitle('youTube-abc123');

		// youtube_id should take priority when both are provided
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle empty youtube_id and list_id', async () => {
		await render(YouTube, {
			youtube_id: '',
			list_id: '',
		});
		const iframe = page.getByTitle('youTube-');

		// Should fallback to playlist format when both are empty
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle invalid aspect ratios', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			aspect_ratio: 'invalid:ratio' as any,
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element();
		const iframeWrapper = iframeElement.parentElement;

		// Should not have padding-top since aspect ratio is invalid
		expect(iframeWrapper?.getAttribute('style')).not.toContain(
			'padding-top:',
		);
	});

	it.skip('should apply all supported aspect ratios correctly', async () => {
		const aspect_ratios = [
			{ ratio: '1:1', expected: '100%' },
			{ ratio: '16:9', expected: '56.25%' },
			{ ratio: '4:3', expected: '75%' },
			{ ratio: '3:2', expected: '66.66%' },
			{ ratio: '8.5', expected: '62.5%' },
		];

		for (const testCase of aspect_ratios) {
			await render(YouTube, {
				youtube_id: 'abc123',
				aspect_ratio: testCase.ratio,
			});

			const iframe = page.getByTestId('youTube');
			const iframeElement = iframe.element();
			const iframeWrapper = iframeElement.parentElement;

			expect(iframeWrapper?.getAttribute('style')).toContain(
				`padding-top: ${testCase.expected};`,
			);
		}
	});

	it('should handle custom iframe styles properly', async () => {
		const customStyles =
			'border-radius: 1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1);';
		await render(YouTube, {
			youtube_id: 'abc123',
			iframe_styles: customStyles,
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		expect(iframeElement.style.cssText).toContain(
			'border-radius: 1rem',
		);
		expect(iframeElement.style.cssText).toContain('box-shadow');
	});

	it('should handle playlist with custom index', async () => {
		const list_id = 'playlist123';
		await render(YouTube, {
			youtube_id: '',
			list_id,
			index: 5,
		});
		const iframe = page.getByTitle(`youTube-${list_id}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${list_id}&index=5&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should have proper accessibility attributes', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		await expect
			.element(iframe)
			.toHaveAttribute('title', 'youTube-abc123');
		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'allow',
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
			);
		await expect.element(iframe).toHaveAttribute('allowfullscreen');
	});

	it('should handle very large skip_to values', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			skip_to: { h: 25, m: 70, s: 120 },
		});
		const iframe = page.getByTitle('youTube-abc123');

		// 25 hours = 90000 seconds, 70 minutes = 4200 seconds, 120 seconds = 120 seconds
		// Total: 90000 + 4200 + 120 = 94320 seconds
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=94320&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle special characters in youtube_id', async () => {
		const youtube_id = 'abc-123_def';
		await render(YouTube, {
			youtube_id,
		});
		const iframe = page.getByTitle(`youTube-${youtube_id}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/${youtube_id}?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle special characters in list_id', async () => {
		const list_id = 'playlist-123_abc';
		await render(YouTube, {
			youtube_id: '',
			list_id,
		});
		const iframe = page.getByTitle(`youTube-${list_id}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${list_id}&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should apply default iframe_styles when not provided', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			// iframe_styles not provided, should use default
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		expect(iframeElement.style.cssText).toContain(
			'border-radius: 0.6rem',
		);
	});

	it.skip('should handle boolean props as different data types', async () => {
		// Test with string values that should be converted to booleans
		await render(YouTube, {
			youtube_id: 'abc123',
			autoplay: 'true' as any,
			mute: 'false' as any,
			controls: 1 as any,
			loop: 0 as any,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// String 'true' should be truthy, 'false' should be truthy (non-empty string)
		// Number 1 should be truthy, 0 should be falsy
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=1&start=0&mute=1&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle zero values in skip_to correctly', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			skip_to: { h: 0, m: 0, s: 0 },
		});
		const iframe = page.getByTitle('youTube-abc123');

		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it.skip('should handle missing skip_to properties gracefully', async () => {
		await render(YouTube, {
			youtube_id: 'abc123',
			skip_to: { h: 1 } as any, // Missing m and s properties
		});
		const iframe = page.getByTitle('youTube-abc123');

		// Missing properties should be treated as undefined, which should be 0
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=3600&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should update the iframe when props change', async () => {
		const { rerender } = await render(YouTube, {
			youtube_id: 'reactive111',
		});
		const iframe = page.getByTestId('youTube');

		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/embed/reactive111?'),
			);

		await rerender({
			youtube_id: 'reactive222',
			skip_to: { m: 1, s: 30 },
			mute: true,
		});

		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/embed/reactive222?'),
			);
		await expect
			.element(iframe)
			.toHaveAttribute('src', expect.stringContaining('start=90'));
		await expect
			.element(iframe)
			.toHaveAttribute('src', expect.stringContaining('mute=1'));
	});
});

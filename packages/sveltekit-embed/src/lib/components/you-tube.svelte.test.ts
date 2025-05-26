import YouTube from '$lib/components/you-tube.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('YouTube', () => {
	it('mounts with video id', async () => {
		const { container } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src for video with default options', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for video with custom options', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: true,
			mute: true,
			controls: false,
			loop: true,
			modestBranding: true,
			rel: true,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=1&start=0&mute=1&controls=0&loop=1&modestbranding=1&rel=1`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for playlist with default options', async () => {
		const listId = '123abc';
		render(YouTube, {
			youTubeId: '',
			listId,
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = page.getByTitle(`youTube-${listId}`);
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${listId}&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('sets aspect ratio using padding-top style', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '4:3',
			iframe_styles: 'border-radius: 0.8rem;',
			disable_observer: true,
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element();
		const iframeWrapper = iframeElement.parentElement;

		expect(iframeWrapper?.getAttribute('style')).toContain(
			'padding-top: 75%;',
		);
	});

	it('renders with a GeneralObserver', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should calculate correct start time with complex skipTo values', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			skipTo: { h: 1, m: 30, s: 45 },
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// 1 hour = 3600 seconds, 30 minutes = 1800 seconds, 45 seconds = 45 seconds
		// Total: 3600 + 1800 + 45 = 5445 seconds
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=5445&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle invalid skipTo values gracefully', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			skipTo: { h: -1, m: -30, s: -45 },
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// Negative values should result in negative start time (-5445)
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=-5445&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it.skip('should handle both youTubeId and listId provided', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			listId: 'playlist456',
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// youTubeId should take priority when both are provided
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle empty youTubeId and listId', async () => {
		render(YouTube, {
			youTubeId: '',
			listId: '',
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-');

		// Should fallback to playlist format when both are empty
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle invalid aspect ratios', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			aspectRatio: 'invalid:ratio' as any,
			disable_observer: true,
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
		const aspectRatios = [
			{ ratio: '1:1', expected: '100%' },
			{ ratio: '16:9', expected: '56.25%' },
			{ ratio: '4:3', expected: '75%' },
			{ ratio: '3:2', expected: '66.66%' },
			{ ratio: '8.5', expected: '62.5%' },
		];

		for (const testCase of aspectRatios) {
			render(YouTube, {
				youTubeId: 'abc123',
				aspectRatio: testCase.ratio,
				disable_observer: true,
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
		render(YouTube, {
			youTubeId: 'abc123',
			iframe_styles: customStyles,
			disable_observer: true,
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		expect(iframeElement.style.cssText).toContain(
			'border-radius: 1rem',
		);
		expect(iframeElement.style.cssText).toContain('box-shadow');
	});

	it('should handle playlist with custom index', async () => {
		const listId = 'playlist123';
		render(YouTube, {
			youTubeId: '',
			listId,
			index: 5,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`youTube-${listId}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${listId}&index=5&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should have proper accessibility attributes', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			disable_observer: true,
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

	it('should handle very large skipTo values', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			skipTo: { h: 25, m: 70, s: 120 },
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// 25 hours = 90000 seconds, 70 minutes = 4200 seconds, 120 seconds = 120 seconds
		// Total: 90000 + 4200 + 120 = 94320 seconds
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=94320&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle special characters in youTubeId', async () => {
		const youTubeId = 'abc-123_def';
		render(YouTube, {
			youTubeId,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`youTube-${youTubeId}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle special characters in listId', async () => {
		const listId = 'playlist-123_abc';
		render(YouTube, {
			youTubeId: '',
			listId,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`youTube-${listId}`);

		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${listId}&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should apply default iframe_styles when not provided', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			// iframe_styles not provided, should use default
			disable_observer: true,
		});

		const iframe = page.getByTestId('youTube');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		expect(iframeElement.style.cssText).toContain(
			'border-radius: 0.6rem',
		);
	});

	it.skip('should handle boolean props as different data types', async () => {
		// Test with string values that should be converted to booleans
		render(YouTube, {
			youTubeId: 'abc123',
			autoPlay: 'true' as any,
			mute: 'false' as any,
			controls: 1 as any,
			loop: 0 as any,
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// String 'true' should be truthy, 'false' should be truthy (non-empty string)
		// Number 1 should be truthy, 0 should be falsy
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=1&start=0&mute=1&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should handle zero values in skipTo correctly', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			skipTo: { h: 0, m: 0, s: 0 },
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it.skip('should handle missing skipTo properties gracefully', async () => {
		render(YouTube, {
			youTubeId: 'abc123',
			skipTo: { h: 1 } as any, // Missing m and s properties
			disable_observer: true,
		});
		const iframe = page.getByTitle('youTube-abc123');

		// Missing properties should be treated as undefined, which should be 0
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=3600&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});
});

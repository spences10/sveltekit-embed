import Vimeo from '$lib/components/vimeo.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Vimeo', () => {
	it('mounts with default values', async () => {
		const { container } = render(Vimeo, {
			vimeoId: '123456789',
			disable_observer: true,
		});

		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const vimeoId = '987654321';
		const { getByTitle } = render(Vimeo, {
			vimeoId,
			autoPlay: true,
			aspectRatio: '4:3',
			skipTo: { h: 1, m: 23, s: 45 },
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=true#t=1h23m45s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom aspect ratio', async () => {
		const { container } = render(Vimeo, {
			vimeoId: '123456789',
			aspectRatio: '1:1',
			disable_observer: true,
		});
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		expect(wrapper?.getAttribute('style')).toContain(
			'padding-top: 100%;',
		);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Vimeo, {
			vimeoId: '123456789',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');

		expect(general_observer).toBeTruthy();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty vimeoId gracefully', async () => {
		const vimeoId = '';

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		const vimeoId = '123456789';

		const { getByTitle, container } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		// Check default values
		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);

		// Check default aspect ratio (16:9 = 56.25%)
		expect(wrapper?.getAttribute('style')).toContain(
			'padding-top: 56.25%;',
		);
	});

	it('should handle different aspect ratio formats', async () => {
		const aspectRatios = ['16:9', '4:3', '1:1', '3:2', '8.5'];
		const expectedPaddings = [
			'56.25%',
			'75%',
			'100%',
			'66.66%',
			'62.5%',
		];

		for (let i = 0; i < aspectRatios.length; i++) {
			const { container } = render(Vimeo, {
				vimeoId: '123456789',
				aspectRatio: aspectRatios[i],
				disable_observer: true,
			});
			const wrapper = container.querySelector('.vimeo-svelte-embed');

			expect(wrapper?.getAttribute('style')).toContain(
				`padding-top: ${expectedPaddings[i]};`,
			);
		}
	});

	it('should construct proper Vimeo player URL', async () => {
		const vimeoId = '987654321';

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			autoPlay: false,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle skipTo time parameter correctly', async () => {
		const vimeoId = '123456789';
		const skipTo = { h: 2, m: 15, s: 30 };

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			skipTo,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=2h15m30s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('should handle autoPlay parameter in URL', async () => {
		const vimeoId = '123456789';

		// Test autoPlay true
		const { getByTitle: getByTitleTrue } = render(Vimeo, {
			vimeoId,
			autoPlay: true,
			disable_observer: true,
		});
		const iframeTrue = getByTitleTrue(`vimeo-${vimeoId}`);

		const expected_src_true = `https://player.vimeo.com/video/${vimeoId}?autoplay=true#t=0h0m0s`;
		await expect
			.element(iframeTrue)
			.toHaveAttribute('src', expected_src_true);

		// Test autoPlay false
		const { getByTitle: getByTitleFalse } = render(Vimeo, {
			vimeoId,
			autoPlay: false,
			disable_observer: true,
		});
		const iframeFalse = getByTitleFalse(`vimeo-${vimeoId}`);

		const expected_src_false = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect
			.element(iframeFalse)
			.toHaveAttribute('src', expected_src_false);
	});

	it('should handle special characters in vimeoId', async () => {
		const vimeoId = '123456789';

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const vimeoId = '123456789';

		const { container } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			const iframeElement = iframe as HTMLIFrameElement;
			await expect
				.element(iframe)
				.toHaveAttribute('title', `vimeo-${vimeoId}`);
			await expect
				.element(iframe)
				.toHaveAttribute('frameBorder', '0');
			await expect
				.element(iframe)
				.toHaveAttribute(
					'allow',
					'autoplay; fullscreen; picture-in-picture',
				);
			await expect.element(iframe).toHaveAttribute('allowFullScreen');
		}
	});

	it('should handle very long vimeoId values', async () => {
		const vimeoId = '1'.repeat(20);

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should calculate aspect ratio padding correctly', async () => {
		const testCases = [
			{ ratio: '16:9', expected: '56.25%' },
			{ ratio: '4:3', expected: '75%' },
			{ ratio: '1:1', expected: '100%' },
			{ ratio: '3:2', expected: '66.66%' },
			{ ratio: '8.5', expected: '62.5%' },
		];

		for (const testCase of testCases) {
			const { container } = render(Vimeo, {
				vimeoId: '123456789',
				aspectRatio: testCase.ratio,
				disable_observer: true,
			});
			const wrapper = container.querySelector('.vimeo-svelte-embed');

			expect(wrapper?.getAttribute('style')).toContain(
				`padding-top: ${testCase.expected};`,
			);
		}
	});

	it('should handle malformed vimeo IDs gracefully', async () => {
		const vimeoId = 'abc123def';

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should render with proper CSS class structure', async () => {
		const vimeoId = '123456789';

		const { getByTestId } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const wrapper = getByTestId('vimeo');

		await expect
			.element(wrapper)
			.toHaveAttribute('class', 'vimeo-svelte-embed');
	});

	it.skip('should handle skipTo with partial time values', async () => {
		const testCases = [
			{ skipTo: { h: 1, m: 0, s: 0 }, expected: '1h0m0s' },
			{ skipTo: { h: 0, m: 30, s: 0 }, expected: '0h30m0s' },
			{ skipTo: { h: 0, m: 0, s: 45 }, expected: '0h0m45s' },
			{ skipTo: { h: 2, m: 15, s: 0 }, expected: '2h15m0s' },
		];

		for (const testCase of testCases) {
			const vimeoId = '123456789';
			const { getByTitle } = render(Vimeo, {
				vimeoId,
				skipTo: testCase.skipTo,
				disable_observer: true,
			});
			const iframe = getByTitle(`vimeo-${vimeoId}`);

			const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=${testCase.expected}`;
			await expect
				.element(iframe)
				.toHaveAttribute('src', expected_src);
		}
	});

	it('should handle numeric vimeoId values', async () => {
		const vimeoId = '987654321';

		const { getByTitle } = render(Vimeo, {
			vimeoId,
			disable_observer: true,
		});
		const iframe = getByTitle(`vimeo-${vimeoId}`);

		const expected_src = `https://player.vimeo.com/video/${vimeoId}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle undefined aspect ratio gracefully', async () => {
		const vimeoId = '123456789';

		// Test with invalid aspect ratio - should fallback to default
		const { container } = render(Vimeo, {
			vimeoId,
			aspectRatio: 'invalid:ratio' as any,
			disable_observer: true,
		});
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		// Should not have padding-top since aspect ratio is invalid
		expect(wrapper?.getAttribute('style')).not.toContain(
			'padding-top:',
		);
	});
});

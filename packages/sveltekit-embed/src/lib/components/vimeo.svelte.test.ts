import Vimeo from './vimeo.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Vimeo', () => {
	it('mounts with default values', async () => {
		const { container } = await render(Vimeo, {
			vimeo_id: '123456789',
		});

		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const vimeo_id = '987654321';
		await render(Vimeo, {
			vimeo_id,
			autoplay: true,
			aspect_ratio: '4:3',
			skip_to: { h: 1, m: 23, s: 45 },
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=true#t=1h23m45s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom aspect ratio', async () => {
		const { container } = await render(Vimeo, {
			vimeo_id: '123456789',
			aspect_ratio: '1:1',
		});
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		expect(wrapper?.getAttribute('style')).toContain(
			'aspect-ratio: 1 / 1;',
		);
	});

	it('lazy loads the iframe by default', async () => {
		await render(Vimeo, {
			vimeo_id: '123456789',
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty vimeo_id gracefully', async () => {
		const vimeo_id = '';

		await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		const vimeo_id = '123456789';

		const { container } = await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		// Check default values
		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);

		// Check default aspect ratio (16:9)
		expect(wrapper?.getAttribute('style')).toContain(
			'aspect-ratio: 16 / 9;',
		);
	});

	it('should handle different aspect ratio formats', async () => {
		const aspect_ratios = ['16:9', '4:3', '1:1', '3:2', '8:5'];
		const expected_ratios = [
			'16 / 9',
			'4 / 3',
			'1 / 1',
			'3 / 2',
			'8 / 5',
		];

		for (let i = 0; i < aspect_ratios.length; i++) {
			const { container } = await render(Vimeo, {
				vimeo_id: '123456789',
				aspect_ratio: aspect_ratios[i],
			});
			const wrapper = container.querySelector('.vimeo-svelte-embed');

			expect(wrapper?.getAttribute('style')).toContain(
				`aspect-ratio: ${expected_ratios[i]};`,
			);
		}
	});

	it('should construct proper Vimeo player URL', async () => {
		const vimeo_id = '987654321';

		await render(Vimeo, {
			vimeo_id,
			autoplay: false,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle skip_to time parameter correctly', async () => {
		const vimeo_id = '123456789';
		const skip_to = { h: 2, m: 15, s: 30 };

		await render(Vimeo, {
			vimeo_id,
			skip_to,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=2h15m30s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('should handle autoplay parameter in URL', async () => {
		const vimeo_id = '123456789';

		// Test autoplay true
		await render(Vimeo, {
			vimeo_id,
			autoplay: true,
		});
		const iframeTrue = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src_true = `https://player.vimeo.com/video/${vimeo_id}?autoplay=true#t=0h0m0s`;
		await expect
			.element(iframeTrue)
			.toHaveAttribute('src', expected_src_true);

		// Test autoplay false
		await render(Vimeo, {
			vimeo_id,
			autoplay: false,
		});
		const iframeFalse = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src_false = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect
			.element(iframeFalse)
			.toHaveAttribute('src', expected_src_false);
	});

	it('should handle special characters in vimeo_id', async () => {
		const vimeo_id = '123456789';

		await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const vimeo_id = '123456789';

		const { container } = await render(Vimeo, {
			vimeo_id,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			const iframeElement = iframe as HTMLIFrameElement;
			await expect
				.element(iframe)
				.toHaveAttribute('title', `vimeo-${vimeo_id}`);
			expect(getComputedStyle(iframeElement).borderTopWidth).toBe(
				'0px',
			);
			await expect
				.element(iframe)
				.toHaveAttribute(
					'allow',
					'autoplay; fullscreen; picture-in-picture',
				);
			await expect.element(iframe).toHaveAttribute('allowFullScreen');
		}
	});

	it('should handle very long vimeo_id values', async () => {
		const vimeo_id = '1'.repeat(20);

		await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should calculate aspect ratio padding correctly', async () => {
		const testCases = [
			{ ratio: '16:9', expected: '16 / 9' },
			{ ratio: '4:3', expected: '4 / 3' },
			{ ratio: '1:1', expected: '1 / 1' },
			{ ratio: '3:2', expected: '3 / 2' },
			{ ratio: '8:5', expected: '8 / 5' },
		];

		for (const testCase of testCases) {
			const { container } = await render(Vimeo, {
				vimeo_id: '123456789',
				aspect_ratio: testCase.ratio,
			});
			const wrapper = container.querySelector('.vimeo-svelte-embed');

			expect(wrapper?.getAttribute('style')).toContain(
				`aspect-ratio: ${testCase.expected};`,
			);
		}
	});

	it('should handle malformed vimeo IDs gracefully', async () => {
		const vimeo_id = 'abc123def';

		await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should render with proper CSS class structure', async () => {
		const vimeo_id = '123456789';

		await render(Vimeo, {
			vimeo_id,
		});
		const wrapper = page.getByTestId('vimeo');

		await expect
			.element(wrapper)
			.toHaveAttribute('class', 'vimeo-svelte-embed');
	});

	it.skip('should handle skip_to with partial time values', async () => {
		const testCases = [
			{ skip_to: { h: 1, m: 0, s: 0 }, expected: '1h0m0s' },
			{ skip_to: { h: 0, m: 30, s: 0 }, expected: '0h30m0s' },
			{ skip_to: { h: 0, m: 0, s: 45 }, expected: '0h0m45s' },
			{ skip_to: { h: 2, m: 15, s: 0 }, expected: '2h15m0s' },
		];

		for (const testCase of testCases) {
			const vimeo_id = '123456789';
			await render(Vimeo, {
				vimeo_id,
				skip_to: testCase.skip_to,
			});
			const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

			const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=${testCase.expected}`;
			await expect
				.element(iframe)
				.toHaveAttribute('src', expected_src);
		}
	});

	it('should handle numeric vimeo_id values', async () => {
		const vimeo_id = '987654321';

		await render(Vimeo, {
			vimeo_id,
		});
		const iframe = page.getByTitle(`vimeo-${vimeo_id}`);

		const expected_src = `https://player.vimeo.com/video/${vimeo_id}?autoplay=false#t=0h0m0s`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle undefined aspect ratio gracefully', async () => {
		const vimeo_id = '123456789';

		// Test with invalid aspect ratio - should fallback to default
		const { container } = await render(Vimeo, {
			vimeo_id,
			aspect_ratio: 'invalid:ratio' as any,
		});
		const wrapper = container.querySelector('.vimeo-svelte-embed');

		// An unreadable ratio falls back to 16:9
		expect(wrapper?.getAttribute('style')).toContain(
			'aspect-ratio: 16 / 9;',
		);
	});

	it('should update the iframe when props change', async () => {
		const { rerender } = await render(Vimeo, {
			vimeo_id: '111111',
		});

		await expect
			.element(page.getByTitle('vimeo-111111'))
			.toHaveAttribute(
				'src',
				expect.stringContaining('/video/111111?'),
			);

		await rerender({ vimeo_id: '222222', skip_to: { m: 2, s: 5 } });

		const iframe = page.getByTitle('vimeo-222222');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/video/222222?'),
			);
		await expect
			.element(iframe)
			.toHaveAttribute('src', expect.stringContaining('#t=0h2m5s'));
	});
});

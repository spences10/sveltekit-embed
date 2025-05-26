import Relive from '$lib/components/relive.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

const reliveId = '12345678-abcd-1234-5678-123456789abc';

describe('Relive', () => {
	it('mounts with default props', async () => {
		const { container } = render(Relive);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		render(Relive, {
			reliveId,
			disable_observer: true,
		});
		const iframe = page.getByTitle(`relive-${reliveId}`);
		const expected_src = `https://www.relive.cc/view/${reliveId}/widget`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('mounts with custom width', async () => {
		const customWidth = '50%';
		const { container } = render(Relive, {
			reliveId,
			width: customWidth,
			disable_observer: true,
		});
		const wrapper = container.querySelector('div');

		expect(wrapper?.getAttribute('style')).toContain(
			`width: ${customWidth}`,
		);
	});

	it('renders with a GeneralObserver', async () => {
		render(Relive, {
			reliveId,
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	describe('Edge Cases', () => {
		it('should handle empty reliveId gracefully', async () => {
			const { container } = render(Relive, {
				reliveId: '',
				disable_observer: true,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe?.getAttribute('src')).toBe(
				'https://www.relive.cc/view//widget',
			);
			expect(iframe?.getAttribute('title')).toBe('relive-');
		});

		it('should handle special characters in reliveId', async () => {
			const specialReliveId = 'test-id_123';
			render(Relive, {
				reliveId: specialReliveId,
				disable_observer: true,
			});
			const iframe = page.getByTitle(`relive-${specialReliveId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toBe(
				`https://www.relive.cc/view/${specialReliveId}/widget`,
			);
		});

		it('should handle very long reliveId values', async () => {
			const longReliveId = 'a'.repeat(1000);
			render(Relive, {
				reliveId: longReliveId,
				disable_observer: true,
			});
			const iframe = page.getByTitle(`relive-${longReliveId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(longReliveId);
		});

		it('should handle malformed reliveId gracefully', async () => {
			const malformedId = 'not/a/valid/id';
			render(Relive, {
				reliveId: malformedId,
				disable_observer: true,
			});
			const iframe = page.getByTitle(`relive-${malformedId}`);
			const element = iframe.element() as HTMLIFrameElement;

			// Should still render with the malformed ID
			expect(element.src).toBe(
				`https://www.relive.cc/view/${malformedId}/widget`,
			);
		});
	});

	describe('Default Props', () => {
		it.skip('should apply default width when not provided', async () => {
			const { container } = render(Relive, {
				reliveId,
				disable_observer: true,
			});
			const wrapper = container.querySelector('div');

			expect(wrapper?.getAttribute('style')).toContain('width: 100%');
		});
	});

	describe('Layout and Styling', () => {
		it.skip('should apply proper aspect ratio and positioning', async () => {
			const { container } = render(Relive, {
				reliveId,
				disable_observer: true,
			});
			const wrapper = container.querySelector('div');
			const iframe = container.querySelector('iframe');

			// Check wrapper styling via style attribute
			const wrapperStyle = wrapper?.getAttribute('style') || '';
			expect(wrapperStyle).toContain('position: relative');
			expect(wrapperStyle).toContain('aspect-ratio: 1 / 0.7825');
			expect(wrapperStyle).toContain('overflow: hidden');

			// Check iframe positioning via style attribute
			const iframeStyle = iframe?.getAttribute('style') || '';
			expect(iframeStyle).toContain('position: absolute');
			expect(iframeStyle).toContain('top: -2px');
			expect(iframeStyle).toContain('left: -2px');
			expect(iframeStyle).toContain('width: calc(100% + 4px)');
			expect(iframeStyle).toContain('height: calc(100% + 4px)');
		});

		it.skip('should handle custom width values', async () => {
			const widths = ['50%', '300px', '80vw'];

			for (const width of widths) {
				const { container } = render(Relive, {
					reliveId: `${reliveId}-${width}`,
					width,
					disable_observer: true,
				});
				const wrapper = container.querySelector('div');

				expect(wrapper?.getAttribute('style')).toContain(
					`width: ${width}`,
				);
			}
		});
	});

	describe('URL Construction', () => {
		it('should construct proper Relive widget URL', async () => {
			const testReliveId = 'test-123-abc';
			render(Relive, {
				reliveId: testReliveId,
				disable_observer: true,
			});
			const iframe = page.getByTitle(`relive-${testReliveId}`);
			const element = iframe.element() as HTMLIFrameElement;

			const expectedUrl = `https://www.relive.cc/view/${testReliveId}/widget`;
			expect(element.src).toBe(expectedUrl);
		});
	});

	describe('Accessibility and Security', () => {
		it('should have proper iframe accessibility and security attributes', async () => {
			render(Relive, {
				reliveId,
				disable_observer: true,
			});
			const iframe = page.getByTitle(`relive-${reliveId}`);

			await expect
				.element(iframe)
				.toHaveAttribute('title', `relive-${reliveId}`);
			await expect
				.element(iframe)
				.toHaveAttribute('frameborder', '0');
			await expect.element(iframe).toHaveAttribute('scrolling', 'no');
			await expect
				.element(iframe)
				.toHaveAttribute('allowfullscreen', '');
		});
	});

	describe('Component Structure', () => {
		it('should maintain proper wrapper and iframe structure', async () => {
			const { container } = render(Relive, {
				reliveId,
				disable_observer: true,
			});

			const wrapper = container.querySelector('div');
			const iframe = container.querySelector('iframe');

			expect(wrapper).toBeTruthy();
			expect(iframe).toBeTruthy();
			expect(wrapper?.contains(iframe)).toBe(true);
		});
	});

	describe('Constants', () => {
		it('should use correct default margin value', async () => {
			const { container } = render(Relive, {
				reliveId,
				disable_observer: true,
			});
			const iframe = container.querySelector('iframe');

			// Check that the default margin is 2px via style attribute
			const iframeStyle = iframe?.getAttribute('style') || '';
			expect(iframeStyle).toContain('top: -2px');
			expect(iframeStyle).toContain('left: -2px');
			expect(iframeStyle).toContain('width: calc(100% + 4px)');
			expect(iframeStyle).toContain('height: calc(100% + 4px)');
		});
	});
});

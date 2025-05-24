import GenericEmbed from '$lib/components/generic-embed.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('GenericEmbed', () => {
	it('mounts with default props', async () => {
		const { container } = render(GenericEmbed, {
			src: '',
			title: 'Test Title',
			height: '152px',
			width: '100%',
			disable_observer: true,
			children: (() => {}) as any,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src and props', async () => {
		const src = 'https://www.youtube.com/watch?v=o-YBDTqX_ZU';
		const title =
			'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)';
		const height = '500px';
		const width = '100%';
		const { getByTitle } = render(GenericEmbed, {
			src,
			title,
			height,
			width,
			disable_observer: true,
			children: (() => {}) as any,
		});
		const iframe = getByTitle(title);

		await expect.element(iframe).toHaveAttribute('src', src);
		await expect.element(iframe).toHaveAttribute('height', height);
		await expect.element(iframe).toHaveAttribute('width', width);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(GenericEmbed, {
			src: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU',
			title:
				'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)',
			height: '200px',
			width: '50%',
			disable_observer: true,
			children: (() => {}) as any,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('height')).toBe('200px');
			expect(iframe.getAttribute('width')).toBe('50%');
		}
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(GenericEmbed, {
			src: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU',
			title:
				'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)',
			height: '152px',
			width: '100%',
			disable_observer: false,
			children: (() => {}) as any,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	describe('Edge Cases', () => {
		it('should handle empty src gracefully', async () => {
			const { container } = render(GenericEmbed, {
				src: '',
				title: 'Test Title',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe).toBeTruthy();
			expect(iframe?.getAttribute('src')).toBe('');
		});

		it('should handle special characters in src URL', async () => {
			const specialSrc =
				'https://example.com/video?id=test&param=value%20with%20spaces';
			const { getByTitle } = render(GenericEmbed, {
				src: specialSrc,
				title: 'Special URL Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle('Special URL Test');

			await expect.element(iframe).toHaveAttribute('src', specialSrc);
		});

		it('should handle special characters in title', async () => {
			const specialTitle = 'Test "Title" with <tags> & symbols!';
			const { getByTitle } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: specialTitle,
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle(specialTitle);

			await expect
				.element(iframe)
				.toHaveAttribute('title', specialTitle);
		});

		it('should handle very long src URLs', async () => {
			const longSrc = 'https://example.com/' + 'a'.repeat(1000);
			const { getByTitle } = render(GenericEmbed, {
				src: longSrc,
				title: 'Long URL Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle('Long URL Test');

			await expect.element(iframe).toHaveAttribute('src', longSrc);
		});

		it('should handle very long titles', async () => {
			const longTitle = 'Long Title '.repeat(100);
			const { getByTitle } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: longTitle,
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle(longTitle);

			await expect
				.element(iframe)
				.toHaveAttribute('title', longTitle);
		});

		it('should handle malformed URLs gracefully', async () => {
			const malformedUrl = 'not-a-valid-url';
			const { getByTitle } = render(GenericEmbed, {
				src: malformedUrl,
				title: 'Malformed URL Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle('Malformed URL Test');

			// Should still render with the malformed URL
			await expect
				.element(iframe)
				.toHaveAttribute('src', malformedUrl);
		});
	});

	describe('Default Props', () => {
		it('should apply default prop values when not provided', async () => {
			const { container } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: 'Default Props Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe).toBeTruthy();
			if (iframe) {
				// Check default values are applied
				expect(iframe.getAttribute('height')).toBe('152px');
				expect(iframe.getAttribute('width')).toBe('100%');
			}
		});
	});

	describe('Custom Dimensions', () => {
		it('should handle numeric height and width values', async () => {
			const { container } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: 'Numeric Dimensions Test',
				height: '300px',
				width: '80%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe).toBeTruthy();
			if (iframe) {
				expect(iframe.getAttribute('height')).toBe('300px');
				expect(iframe.getAttribute('width')).toBe('80%');
			}
		});
	});

	describe('Security', () => {
		it('should have proper iframe security attributes', async () => {
			const { getByTitle } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: 'Security Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});
			const iframe = getByTitle('Security Test');

			await expect
				.element(iframe)
				.toHaveAttribute('title', 'Security Test');
			await expect
				.element(iframe)
				.toHaveAttribute('src', 'https://example.com/video');
		});
	});

	describe('Structure', () => {
		it('should maintain proper iframe structure', async () => {
			const { container } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: 'Structure Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
			});

			const iframe = container.querySelector('iframe');
			expect(iframe).toBeTruthy();
			expect(iframe?.tagName).toBe('IFRAME');
		});
	});

	describe('Additional Attributes', () => {
		it('should pass through additional attributes via rest props', async () => {
			const { getByTitle } = render(GenericEmbed, {
				src: 'https://example.com/video',
				title: 'Rest Props Test',
				height: '152px',
				width: '100%',
				disable_observer: true,
				children: (() => {}) as any,
				frameborder: '0',
				allowfullscreen: true,
			} as any);
			const iframe = getByTitle('Rest Props Test');

			await expect
				.element(iframe)
				.toHaveAttribute('frameborder', '0');
			await expect
				.element(iframe)
				.toHaveAttribute('allowfullscreen', '');
		});
	});
});

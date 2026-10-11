import Deezer from './deezer.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

const theme = 'auto';
const frame_src = 'track/1366751722';
const height = '300px';
const width = '100%';

describe('Deezer', () => {
	it('mounts with default props', async () => {
		const { container } = await render(Deezer);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		await render(Deezer, {
			theme,
			frame_src,
			height,
			width,
		});
		const iframe = page.getByTitle('deezer-widget');
		const expected_src = `https://widget.deezer.com/widget/${theme}/${frame_src}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = await render(Deezer, {
			theme,
			frame_src,
			height: '200px',
			width: '50%',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('style')).toContain(`height: 200px`);
		expect(iframe?.getAttribute('style')).toContain(`width: 50%`);
	});

	it('lazy loads the iframe by default', async () => {
		await render(Deezer, {
			theme,
			frame_src,
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	describe('Edge Cases', () => {
		it('should handle empty frame_src gracefully', async () => {
			await render(Deezer, {
				theme,
				frame_src: '',
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still construct a valid URL even with empty frame_src
			expect(element.src).toBe(
				`https://widget.deezer.com/widget/${theme}/`,
			);
		});

		it('should handle special characters in frame_src', async () => {
			const specialFrameSrc = 'track/123-test_track';
			await render(Deezer, {
				theme,
				frame_src: specialFrameSrc,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(specialFrameSrc);
		});

		it('should handle very long frame_src values', async () => {
			const longFrameSrc = 'track/' + 'a'.repeat(1000);
			await render(Deezer, {
				theme,
				frame_src: longFrameSrc,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(longFrameSrc);
		});
	});

	describe('Default Props', () => {
		it('should apply default theme when not provided', async () => {
			await render(Deezer, {
				frame_src,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain('widget/auto/');
		});

		it('should apply default border-radius styling', async () => {
			await render(Deezer, {
				theme,
				frame_src,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.style.borderRadius).toBe('0.6rem');
		});
	});

	describe('Theme Options', () => {
		it.skip('should handle different theme options', async () => {
			const themes = ['light', 'dark', 'auto'];

			for (let i = 0; i < themes.length; i++) {
				const testTheme = themes[i];
				const uniqueFrameSrc = `track/${i}`;
				await render(Deezer, {
					theme: testTheme,
					frame_src: uniqueFrameSrc,
				});
				const iframe = page.getByTitle('deezer-widget');
				const element = iframe.element() as HTMLIFrameElement;

				expect(element.src).toBe(
					`https://widget.deezer.com/widget/${testTheme}/${uniqueFrameSrc}`,
				);
			}
		});
	});

	describe('Custom Styling', () => {
		it('should apply custom iframe styles correctly', async () => {
			const customStyles = 'border: 2px solid red; background: blue;';
			await render(Deezer, {
				theme,
				frame_src,
				iframe_styles: customStyles,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.getAttribute('style')).toBe(customStyles);
		});

		it('should handle numeric height and width values', async () => {
			const { container } = await render(Deezer, {
				theme,
				frame_src,
				height: '400px',
				width: '80%',
			});
			const iframe = container.querySelector('iframe');

			expect(iframe?.style.height).toBe('400px');
			expect(iframe?.style.width).toBe('80%');
		});
	});

	describe('URL Construction', () => {
		it('should construct widget URL correctly', async () => {
			const testTheme = 'dark';
			const testFrameSrc = 'playlist/123456';
			await render(Deezer, {
				theme: testTheme,
				frame_src: testFrameSrc,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			const expectedUrl = `https://widget.deezer.com/widget/${testTheme}/${testFrameSrc}`;
			expect(element.src).toBe(expectedUrl);
		});
	});

	describe('Accessibility', () => {
		it('should have proper iframe accessibility and security attributes', async () => {
			await render(Deezer, {
				theme,
				frame_src,
			});
			const iframe = page.getByTitle('deezer-widget');

			await expect
				.element(iframe)
				.toHaveAttribute('title', 'deezer-widget');
			await expect
				.element(iframe)
				.toHaveAttribute('frameborder', '0');
			await expect
				.element(iframe)
				.toHaveAttribute('allowtransparency', '');
			await expect
				.element(iframe)
				.toHaveAttribute('allow', 'encrypted-media; clipboard-write');
		});
	});

	describe('Reactivity', () => {
		it('should update the iframe when props change', async () => {
			const { rerender } = await render(Deezer, {
				frame_src: 'show/111',
			});
			const iframe = page.getByTitle('deezer-widget');

			await expect
				.element(iframe)
				.toHaveAttribute('src', expect.stringContaining('show/111'));

			await rerender({
				frame_src: 'show/222',
				theme: 'dark',
				height: '200px',
			});

			await expect
				.element(iframe)
				.toHaveAttribute(
					'src',
					expect.stringContaining('widget/dark/show/222'),
				);
			await expect
				.element(iframe)
				.toHaveAttribute('style', expect.stringContaining('200px'));
		});
	});
});

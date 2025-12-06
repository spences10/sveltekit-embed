import Deezer from '$lib/components/deezer.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

const theme = 'auto';
const frameSrc = 'track/1366751722';
const height = '300px';
const width = '100%';

describe('Deezer', () => {
	it('mounts with default props', async () => {
		const { container } = render(Deezer);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		render(Deezer, {
			theme,
			frameSrc,
			height,
			width,
			disable_observer: true,
		});
		const iframe = page.getByTitle('deezer-widget');
		const expected_src = `https://widget.deezer.com/widget/${theme}/${frameSrc}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Deezer, {
			theme,
			frameSrc,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('style')).toContain(`height: 200px`);
		expect(iframe?.getAttribute('style')).toContain(`width: 50%`);
	});

	it('renders with a GeneralObserver', async () => {
		render(Deezer, {
			theme,
			frameSrc,
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	describe('Edge Cases', () => {
		it('should handle empty frameSrc gracefully', async () => {
			render(Deezer, {
				theme,
				frameSrc: '',
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still construct a valid URL even with empty frameSrc
			expect(element.src).toBe(
				`https://widget.deezer.com/widget/${theme}/`,
			);
		});

		it('should handle special characters in frameSrc', async () => {
			const specialFrameSrc = 'track/123-test_track';
			render(Deezer, {
				theme,
				frameSrc: specialFrameSrc,
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(specialFrameSrc);
		});

		it('should handle very long frameSrc values', async () => {
			const longFrameSrc = 'track/' + 'a'.repeat(1000);
			render(Deezer, {
				theme,
				frameSrc: longFrameSrc,
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(longFrameSrc);
		});
	});

	describe('Default Props', () => {
		it('should apply default theme when not provided', async () => {
			render(Deezer, {
				frameSrc,
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain('widget/auto/');
		});

		it('should apply default border-radius styling', async () => {
			render(Deezer, {
				theme,
				frameSrc,
				disable_observer: true,
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
				render(Deezer, {
					theme: testTheme,
					frameSrc: uniqueFrameSrc,
					disable_observer: true,
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
			render(Deezer, {
				theme,
				frameSrc,
				iframe_styles: customStyles,
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.getAttribute('style')).toBe(customStyles);
		});

		it('should handle numeric height and width values', async () => {
			const { container } = render(Deezer, {
				theme,
				frameSrc,
				height: '400px',
				width: '80%',
				disable_observer: true,
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
			render(Deezer, {
				theme: testTheme,
				frameSrc: testFrameSrc,
				disable_observer: true,
			});
			const iframe = page.getByTitle('deezer-widget');
			const element = iframe.element() as HTMLIFrameElement;

			const expectedUrl = `https://widget.deezer.com/widget/${testTheme}/${testFrameSrc}`;
			expect(element.src).toBe(expectedUrl);
		});
	});

	describe('Accessibility', () => {
		it('should have proper iframe accessibility and security attributes', async () => {
			render(Deezer, {
				theme,
				frameSrc,
				disable_observer: true,
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
});

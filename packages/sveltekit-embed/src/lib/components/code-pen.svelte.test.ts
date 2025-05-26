import CodePen from '$lib/components/code-pen.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

let codePenId = 'abcde';

describe('CodePen', () => {
	it('mounts', async () => {
		const { container } = render(CodePen, {
			codePenId,
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct attributes', async () => {
		render(CodePen, {
			codePenId,
			disable_observer: true,
		});

		const iframe = page.getByTitle(`codepen-${codePenId}`);
		const element = iframe.element();

		expect(element.getAttribute('src')).toContain(
			`codepen.io/team/codepen/embed`,
		);
		expect(element.getAttribute('src')).toContain(`/${codePenId}/`);
		expect(element.getAttribute('src')).toContain(`height=500px`);
		expect(element.getAttribute('src')).toContain(`theme-id=default`);
		expect(element.getAttribute('src')).toContain(
			`default-tab=result`,
		);
		expect(element.getAttribute('src')).toContain(`editable=true`);
		expect(element.getAttribute('src')).toContain('/preview');
		await expect.element(iframe).toHaveAttribute('frameborder', 'no');
		await expect
			.element(iframe)
			.toHaveAttribute('allowfullscreen', '');
		expect(element.getAttribute('style')).toContain(`height: 500px`);
		expect(element.getAttribute('style')).toContain(`width: 100%`);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(CodePen, {
			codePenId,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe?.getAttribute('style')).toContain('height: 200px');
		expect(iframe?.getAttribute('style')).toContain('width: 50%');
	});

	it('renders with a GeneralObserver', async () => {
		render(CodePen, {
			codePenId,
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	describe('Edge Cases', () => {
		it('should handle empty codePenId gracefully', async () => {
			render(CodePen, {
				codePenId: '',
				disable_observer: true,
			});

			const iframe = page.getByTitle('codepen-');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still construct a valid URL even with empty ID
			expect(element.src).toContain('codepen.io/team/codepen/embed');
			expect(element.src).toContain('//'); // Double slash where ID would be
		});

		it('should handle special characters in codePenId', async () => {
			const specialId = 'abc-123_test';
			render(CodePen, {
				codePenId: specialId,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${specialId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(`/${specialId}/`);
			expect(element.title).toBe(`codepen-${specialId}`);
		});
	});

	describe('Default Props', () => {
		it('should apply default prop values when not provided', async () => {
			const { container } = render(CodePen, {
				codePenId,
				disable_observer: true,
			});

			const iframe = container.querySelector(
				'iframe',
			) as HTMLIFrameElement;

			// Check default values are applied
			expect(iframe.src).toContain('height=500px'); // default height
			expect(iframe.src).toContain('theme-id=default'); // default theme
			expect(iframe.src).toContain('default-tab=result'); // default tabs
			expect(iframe.src).toContain('editable=true'); // default editable
			expect(iframe.src).toContain('/preview'); // default clickToLoad=true
			expect(iframe.style.height).toBe('500px');
			expect(iframe.style.width).toBe('100%');
		});
	});

	describe('Tabs Configuration', () => {
		it('should handle different string tab values', async () => {
			const tabOptions = ['js', 'css', 'scss', 'less', 'result'];

			for (let i = 0; i < tabOptions.length; i++) {
				const tab = tabOptions[i];
				const uniqueId = `${codePenId}-tab-${i}`;
				render(CodePen, {
					codePenId: uniqueId,
					tabs: tab as any,
					disable_observer: true,
				});

				const iframe = page.getByTitle(`codepen-${uniqueId}`);
				const element = iframe.element() as HTMLIFrameElement;

				expect(element.src).toContain(`default-tab=${tab}`);
			}
		});

		it('should handle array of tabs configuration', async () => {
			const tabsArray = ['js', 'css'];
			const uniqueId = `${codePenId}-array`;
			render(CodePen, {
				codePenId: uniqueId,
				tabs: tabsArray as any,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${uniqueId}`);
			const element = iframe.element() as HTMLIFrameElement;

			// When tabs is an array, it should be converted to string or handle appropriately
			expect(element.src).toContain('default-tab=');
		});
	});

	describe('Theme Options', () => {
		it('should handle different theme options', async () => {
			const themes = ['light', 'dark', 'default'];

			for (let i = 0; i < themes.length; i++) {
				const theme = themes[i];
				const uniqueId = `${codePenId}-theme-${i}`;
				render(CodePen, {
					codePenId: uniqueId,
					theme,
					disable_observer: true,
				});

				const iframe = page.getByTitle(`codepen-${uniqueId}`);
				const element = iframe.element() as HTMLIFrameElement;

				expect(element.src).toContain(`theme-id=${theme}`);
			}
		});
	});

	describe('Click to Load', () => {
		it('should toggle clickToLoad properly in URL', async () => {
			// Test clickToLoad = false (no /preview in URL)
			const falseId = `${codePenId}-click-false`;
			render(CodePen, {
				codePenId: falseId,
				clickToLoad: false,
				disable_observer: true,
			});

			const iframeFalse = page.getByTitle(`codepen-${falseId}`);
			const elementFalse = iframeFalse.element() as HTMLIFrameElement;

			expect(elementFalse.src).not.toContain('/preview');
			expect(elementFalse.src).toContain(`/${falseId}/`);

			// Test clickToLoad = true (includes /preview in URL)
			const trueId = `${codePenId}-click-true`;
			render(CodePen, {
				codePenId: trueId,
				clickToLoad: true,
				disable_observer: true,
			});

			const iframeTrue = page.getByTitle(`codepen-${trueId}`);
			const elementTrue = iframeTrue.element() as HTMLIFrameElement;

			expect(elementTrue.src).toContain('/preview');
		});
	});

	describe('Editable Parameter', () => {
		it('should handle editable parameter correctly', async () => {
			// Test editable = false
			const falseId = `${codePenId}-edit-false`;
			render(CodePen, {
				codePenId: falseId,
				editable: false,
				disable_observer: true,
			});

			const iframeFalse = page.getByTitle(`codepen-${falseId}`);
			const elementFalse = iframeFalse.element() as HTMLIFrameElement;

			expect(elementFalse.src).toContain('editable=false');

			// Test editable = true
			const trueId = `${codePenId}-edit-true`;
			render(CodePen, {
				codePenId: trueId,
				editable: true,
				disable_observer: true,
			});

			const iframeTrue = page.getByTitle(`codepen-${trueId}`);
			const elementTrue = iframeTrue.element() as HTMLIFrameElement;

			expect(elementTrue.src).toContain('editable=true');
		});
	});

	describe('Custom Styling', () => {
		it('should apply custom iframe styles correctly', async () => {
			const customStyles =
				'border: 2px solid red; border-radius: 8px;';
			render(CodePen, {
				codePenId,
				iframe_styles: customStyles,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${codePenId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.getAttribute('style')).toBe(customStyles);
		});

		it('should handle custom height and width in iframe styles', async () => {
			const customHeight = '300px';
			const customWidth = '80%';
			render(CodePen, {
				codePenId,
				height: customHeight,
				width: customWidth,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${codePenId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.style.height).toBe(customHeight);
			expect(element.style.width).toBe(customWidth);
			expect(element.src).toContain(`height=${customHeight}`);
		});
	});

	describe('URL Construction', () => {
		it('should construct proper URL for all parameter combinations', async () => {
			render(CodePen, {
				codePenId: 'test123',
				height: '400px',
				theme: 'dark',
				tabs: 'js',
				editable: false,
				clickToLoad: false,
				disable_observer: true,
			});

			const iframe = page.getByTitle('codepen-test123');
			const element = iframe.element() as HTMLIFrameElement;
			const src = element.src;

			expect(src).toContain('codepen.io/team/codepen/embed');
			expect(src).toContain('/test123/');
			expect(src).toContain('height=400px');
			expect(src).toContain('theme-id=dark');
			expect(src).toContain('default-tab=js');
			expect(src).toContain('editable=false');
			expect(src).not.toContain('/preview'); // clickToLoad=false
		});
	});

	describe('Accessibility', () => {
		it('should have proper iframe accessibility attributes', async () => {
			render(CodePen, {
				codePenId,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${codePenId}`);

			await expect
				.element(iframe)
				.toHaveAttribute('title', `codepen-${codePenId}`);
			await expect
				.element(iframe)
				.toHaveAttribute('frameborder', 'no');
			await expect
				.element(iframe)
				.toHaveAttribute('allowfullscreen', '');
		});

		it('should render with proper CSS class', async () => {
			render(CodePen, {
				codePenId,
				disable_observer: true,
			});

			const iframe = page.getByTitle(`codepen-${codePenId}`);

			await expect
				.element(iframe)
				.toHaveClass('code-pen-sveltekit-embed');
		});
	});
});

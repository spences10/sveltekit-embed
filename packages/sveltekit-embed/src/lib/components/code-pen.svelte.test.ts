import CodePen from './code-pen.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

let codepen_id = 'abcde';

describe('CodePen', () => {
	it('mounts', async () => {
		const { container } = await render(CodePen, {
			codepen_id,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct attributes', async () => {
		await render(CodePen, {
			codepen_id,
		});

		const iframe = page.getByTitle(`codepen-${codepen_id}`);
		const element = iframe.element();

		expect(element.getAttribute('src')).toContain(
			`codepen.io/team/codepen/embed`,
		);
		expect(element.getAttribute('src')).toContain(`/${codepen_id}/`);
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
		const { container } = await render(CodePen, {
			codepen_id,
			height: '200px',
			width: '50%',
		});
		const iframe = container.querySelector('iframe');
		expect(iframe?.getAttribute('style')).toContain('height: 200px');
		expect(iframe?.getAttribute('style')).toContain('width: 50%');
	});

	it('lazy loads the iframe by default', async () => {
		await render(CodePen, {
			codepen_id,
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	describe('Edge Cases', () => {
		it('should handle empty codepen_id gracefully', async () => {
			await render(CodePen, {
				codepen_id: '',
			});

			const iframe = page.getByTitle('codepen-');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still construct a valid URL even with empty ID
			expect(element.src).toContain('codepen.io/team/codepen/embed');
			expect(element.src).toContain('//'); // Double slash where ID would be
		});

		it('should handle special characters in codepen_id', async () => {
			const specialId = 'abc-123_test';
			await render(CodePen, {
				codepen_id: specialId,
			});

			const iframe = page.getByTitle(`codepen-${specialId}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(`/${specialId}/`);
			expect(element.title).toBe(`codepen-${specialId}`);
		});
	});

	describe('Default Props', () => {
		it('should apply default prop values when not provided', async () => {
			const { container } = await render(CodePen, {
				codepen_id,
			});

			const iframe = container.querySelector(
				'iframe',
			) as HTMLIFrameElement;

			// Check default values are applied
			expect(iframe.src).toContain('height=500px'); // default height
			expect(iframe.src).toContain('theme-id=default'); // default theme
			expect(iframe.src).toContain('default-tab=result'); // default tabs
			expect(iframe.src).toContain('editable=true'); // default editable
			expect(iframe.src).toContain('/preview'); // default click_to_load=true
			expect(iframe.style.height).toBe('500px');
			expect(iframe.style.width).toBe('100%');
		});
	});

	describe('Tabs Configuration', () => {
		it('should handle different string tab values', async () => {
			const tabOptions = ['js', 'css', 'scss', 'less', 'result'];

			for (let i = 0; i < tabOptions.length; i++) {
				const tab = tabOptions[i];
				const uniqueId = `${codepen_id}-tab-${i}`;
				await render(CodePen, {
					codepen_id: uniqueId,
					tabs: tab as any,
				});

				const iframe = page.getByTitle(`codepen-${uniqueId}`);
				const element = iframe.element() as HTMLIFrameElement;

				expect(element.src).toContain(`default-tab=${tab}`);
			}
		});

		it('should handle array of tabs configuration', async () => {
			const tabsArray = ['js', 'css'];
			const uniqueId = `${codepen_id}-array`;
			await render(CodePen, {
				codepen_id: uniqueId,
				tabs: tabsArray as any,
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
				const uniqueId = `${codepen_id}-theme-${i}`;
				await render(CodePen, {
					codepen_id: uniqueId,
					theme,
				});

				const iframe = page.getByTitle(`codepen-${uniqueId}`);
				const element = iframe.element() as HTMLIFrameElement;

				expect(element.src).toContain(`theme-id=${theme}`);
			}
		});
	});

	describe('Click to Load', () => {
		it('should toggle click_to_load properly in URL', async () => {
			// Test click_to_load = false (no /preview in URL)
			const falseId = `${codepen_id}-click-false`;
			await render(CodePen, {
				codepen_id: falseId,
				click_to_load: false,
			});

			const iframeFalse = page.getByTitle(`codepen-${falseId}`);
			const elementFalse = iframeFalse.element() as HTMLIFrameElement;

			expect(elementFalse.src).not.toContain('/preview');
			expect(elementFalse.src).toContain(`/${falseId}/`);

			// Test click_to_load = true (includes /preview in URL)
			const trueId = `${codepen_id}-click-true`;
			await render(CodePen, {
				codepen_id: trueId,
				click_to_load: true,
			});

			const iframeTrue = page.getByTitle(`codepen-${trueId}`);
			const elementTrue = iframeTrue.element() as HTMLIFrameElement;

			expect(elementTrue.src).toContain('/preview');
		});
	});

	describe('Editable Parameter', () => {
		it('should handle editable parameter correctly', async () => {
			// Test editable = false
			const falseId = `${codepen_id}-edit-false`;
			await render(CodePen, {
				codepen_id: falseId,
				editable: false,
			});

			const iframeFalse = page.getByTitle(`codepen-${falseId}`);
			const elementFalse = iframeFalse.element() as HTMLIFrameElement;

			expect(elementFalse.src).toContain('editable=false');

			// Test editable = true
			const trueId = `${codepen_id}-edit-true`;
			await render(CodePen, {
				codepen_id: trueId,
				editable: true,
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
			await render(CodePen, {
				codepen_id,
				iframe_styles: customStyles,
			});

			const iframe = page.getByTitle(`codepen-${codepen_id}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.getAttribute('style')).toBe(customStyles);
		});

		it('should handle custom height and width in iframe styles', async () => {
			const customHeight = '300px';
			const customWidth = '80%';
			await render(CodePen, {
				codepen_id,
				height: customHeight,
				width: customWidth,
			});

			const iframe = page.getByTitle(`codepen-${codepen_id}`);
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.style.height).toBe(customHeight);
			expect(element.style.width).toBe(customWidth);
			expect(element.src).toContain(`height=${customHeight}`);
		});
	});

	describe('URL Construction', () => {
		it('should construct proper URL for all parameter combinations', async () => {
			await render(CodePen, {
				codepen_id: 'test123',
				height: '400px',
				theme: 'dark',
				tabs: 'js',
				editable: false,
				click_to_load: false,
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
			expect(src).not.toContain('/preview'); // click_to_load=false
		});
	});

	describe('Accessibility', () => {
		it('should have proper iframe accessibility attributes', async () => {
			await render(CodePen, {
				codepen_id,
			});

			const iframe = page.getByTitle(`codepen-${codepen_id}`);

			await expect
				.element(iframe)
				.toHaveAttribute('title', `codepen-${codepen_id}`);
			await expect
				.element(iframe)
				.toHaveAttribute('frameborder', 'no');
			await expect
				.element(iframe)
				.toHaveAttribute('allowfullscreen', '');
		});

		it('should render with proper CSS class', async () => {
			await render(CodePen, {
				codepen_id,
			});

			const iframe = page.getByTitle(`codepen-${codepen_id}`);

			await expect
				.element(iframe)
				.toHaveClass('code-pen-sveltekit-embed');
		});
	});

	describe('Reactivity', () => {
		it('should update the iframe when props change', async () => {
			const first_id = `${codepen_id}-reactive-a`;
			const second_id = `${codepen_id}-reactive-b`;
			const { rerender } = await render(CodePen, {
				codepen_id: first_id,
			});

			await expect
				.element(page.getByTitle(`codepen-${first_id}`))
				.toHaveAttribute('src', expect.stringContaining(first_id));

			await rerender({
				codepen_id: second_id,
				theme: 'dark',
				height: '300px',
			});

			const iframe = page.getByTitle(`codepen-${second_id}`);
			await expect
				.element(iframe)
				.toHaveAttribute('src', expect.stringContaining(second_id));
			await expect
				.element(iframe)
				.toHaveAttribute(
					'src',
					expect.stringContaining('theme-id=dark'),
				);
			await expect
				.element(iframe)
				.toHaveAttribute('style', expect.stringContaining('300px'));
		});
	});
});

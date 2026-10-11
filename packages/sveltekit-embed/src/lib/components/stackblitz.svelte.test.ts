import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import StackBlitz from './stackblitz.svelte';

describe('StackBlitz', () => {
	it('mounts with default props', async () => {
		const { container } = await render(StackBlitz, {
			id: 'svelte-kit-template',
			file: 'src/app.html',
		});
		expect(container).toBeTruthy();
	});

	it.skip('renders iframe with correct src', async () => {
		const id = 'svelte-kit-template';
		const file = 'src/app.html';
		const { container } = await render(StackBlitz, {
			id,
			file,
			view: 'editor',
			click_to_load: false,
			hide_navigation: true,
			hide_explorer: false,
			theme: 'light',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain(
			`https://stackblitz.com/edit/${id}?embed=1`,
		);
		expect(src).toContain('ctl=0');
		expect(src).toContain('hideExplorer=0');
		expect(src).toContain('hideNavigation=1');
		expect(src).toContain('theme=light');
		expect(src).toContain('view=editor');
		expect(src).toContain(`file=${file}`);
	});

	it('lazy loads the iframe by default', async () => {
		await render(StackBlitz, {
			id: 'svelte-kit-template',
			file: 'src/app.html',
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty id gracefully', async () => {
		const { container } = await render(StackBlitz, {
			id: '',
			file: 'src/app.html',
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain('https://stackblitz.com/edit/?embed=1');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = await render(StackBlitz, {
			id: 'test-project',
			file: 'index.js',
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();

		expect(iframe && getComputedStyle(iframe).borderTopWidth).toBe(
			'0px',
		);
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
		expect(iframe?.getAttribute('title')).toBe(
			'stackblitz-test-project',
		);
		expect(
			iframe?.classList.contains('stackblitz-sveltekit-embed'),
		).toBe(true);

		const src = iframe?.getAttribute('src');
		expect(src).toContain('ctl=1'); // click_to_load default true
		expect(src).toContain('hideExplorer=1'); // hide_explorer default true
		expect(src).toContain('hideNavigation=0'); // hide_navigation default false
		expect(src).toContain('theme=dark'); // theme default dark
	});

	it('should handle different view options', async () => {
		// Test editor view
		const { container: editorContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'editor',
		});
		const editorIframe = editorContainer.querySelector('iframe');
		expect(editorIframe?.getAttribute('src')).toContain(
			'view=editor',
		);

		// Test preview view
		const { container: previewContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'preview',
		});
		const previewIframe = previewContainer.querySelector('iframe');
		expect(previewIframe?.getAttribute('src')).toContain(
			'view=preview',
		);

		// Test default view (should not include view parameter)
		const { container: defaultContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'default',
		});
		const defaultIframe = defaultContainer.querySelector('iframe');
		expect(defaultIframe?.getAttribute('src')).not.toContain('view=');
	});

	it('should construct proper StackBlitz embed URL', async () => {
		const id = 'my-awesome-project';
		const file = 'src/components/App.svelte';
		const { container } = await render(StackBlitz, {
			id,
			file,
			theme: 'light',
			view: 'editor',
			click_to_load: false,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(
			`https://stackblitz.com/edit/${id}?embed=1`,
		);
		expect(src).toContain(`file=${encodeURIComponent(file)}`);
		expect(src).toContain('theme=light');
		expect(src).toContain('view=editor');
		expect(src).toContain('ctl=0');
	});

	it('should handle special characters in id and file', async () => {
		const id = 'project-with_special-chars123';
		const file = 'src/components/My_Component-test.svelte';
		const { container } = await render(StackBlitz, {
			id,
			file,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(`stackblitz-${id}`);
		const src = iframe?.getAttribute('src');
		expect(src).toContain(id);
		expect(src).toContain(encodeURIComponent(file));
	});

	it('should have proper iframe accessibility attributes', async () => {
		const id = 'accessibility-test';
		const { container } = await render(StackBlitz, {
			id,
			file: 'index.js',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(`stackblitz-${id}`);
		expect(iframe && getComputedStyle(iframe).borderTopWidth).toBe(
			'0px',
		);
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
		expect(
			iframe?.classList.contains('stackblitz-sveltekit-embed'),
		).toBe(true);
	});

	it('should handle very long id and file values', async () => {
		const id = 'a'.repeat(50);
		const file = 'b'.repeat(100) + '.js';
		const { container } = await render(StackBlitz, {
			id,
			file,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(id);
		expect(src).toContain(encodeURIComponent(file));
	});

	it('should apply custom styles correctly', async () => {
		const customStyles =
			'border: 2px solid blue; background: yellow;';
		const { container } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			iframe_styles: customStyles,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.style.cssText).toContain('border: 2px solid blue');
		expect(iframe?.style.cssText).toContain('background: yellow');
	});

	it('should handle boolean configuration options', async () => {
		const { container } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			click_to_load: true,
			hide_navigation: true,
			hide_explorer: false,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain('ctl=1');
		expect(src).toContain('hideNavigation=1');
		expect(src).toContain('hideExplorer=0');
	});

	it('should handle different theme options', async () => {
		// Test light theme
		const { container: lightContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'light',
		});
		const lightIframe = lightContainer.querySelector('iframe');
		expect(lightIframe?.getAttribute('src')).toContain('theme=light');

		// Test dark theme
		const { container: darkContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'dark',
		});
		const darkIframe = darkContainer.querySelector('iframe');
		expect(darkIframe?.getAttribute('src')).toContain('theme=dark');

		// Test custom theme
		const { container: customContainer } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'custom-theme',
		});
		const customIframe = customContainer.querySelector('iframe');
		expect(customIframe?.getAttribute('src')).toContain(
			'theme=custom-theme',
		);
	});

	it('should handle custom dimensions', async () => {
		const { container } = await render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			width: '800px',
			height: '600px',
		});
		const iframe = container.querySelector('iframe');

		// Default iframe_styles should incorporate custom dimensions
		expect(iframe?.style.cssText).toContain('height: 600px');
		expect(iframe?.style.cssText).toContain('width: 800px');
	});

	it('should handle missing file parameter gracefully', async () => {
		const { container } = await render(StackBlitz, {
			id: 'test-project',
			file: undefined,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		// Should not include file parameter when undefined
		expect(src).not.toContain('file=');
		expect(src).toContain(
			'https://stackblitz.com/edit/test-project?embed=1',
		);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = await render(StackBlitz, {
			id: 'class-test',
			file: 'index.js',
		});

		const iframe = container.querySelector('iframe');
		expect(
			iframe?.classList.contains('stackblitz-sveltekit-embed'),
		).toBe(true);
	});

	it('should handle query parameter construction correctly', async () => {
		const { container } = await render(StackBlitz, {
			id: 'test',
			file: 'app.js',
			view: 'editor',
			theme: 'light',
			click_to_load: false,
			hide_navigation: true,
			hide_explorer: false,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		// Check that all parameters are included
		expect(src).toContain('ctl=0');
		expect(src).toContain('hideExplorer=0');
		expect(src).toContain('hideNavigation=1');
		expect(src).toContain('theme=light');
		expect(src).toContain('view=editor');
		expect(src).toContain('file=app.js');

		// Check that base URL is correct
		expect(src).toMatch(
			/^https:\/\/stackblitz\.com\/edit\/test\?embed=1&/,
		);
	});

	it('should update the iframe when props change', async () => {
		const { rerender } = await render(StackBlitz, {
			id: 'reactive-one',
		});

		await expect
			.element(page.getByTitle('stackblitz-reactive-one'))
			.toHaveAttribute(
				'src',
				expect.stringContaining('/edit/reactive-one?embed=1'),
			);

		await rerender({
			id: 'reactive-two',
			theme: 'light',
			hide_navigation: true,
		});

		const iframe = page.getByTitle('stackblitz-reactive-two');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('/edit/reactive-two?embed=1'),
			);
		await expect
			.element(iframe)
			.toHaveAttribute('src', expect.stringContaining('theme=light'));
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				expect.stringContaining('hideNavigation=1'),
			);
	});
});

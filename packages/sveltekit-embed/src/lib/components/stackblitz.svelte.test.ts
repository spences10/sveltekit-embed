import StackBlitz from '$lib/components/stackblitz.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('StackBlitz', () => {
	it('mounts with default props', async () => {
		const { container } = render(StackBlitz, {
			id: 'svelte-kit-template',
			file: 'src/app.html',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it.skip('renders iframe with correct src', async () => {
		const id = 'svelte-kit-template';
		const file = 'src/app.html';
		const { container } = render(StackBlitz, {
			id,
			file,
			view: 'editor',
			clickToLoad: false,
			hideNavigation: true,
			hideExplorer: false,
			theme: 'light',
			disable_observer: true,
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

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(StackBlitz, {
			id: 'svelte-kit-template',
			file: 'src/app.html',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty id gracefully', async () => {
		const { container } = render(StackBlitz, {
			id: '',
			file: 'src/app.html',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain('https://stackblitz.com/edit/?embed=1');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = render(StackBlitz, {
			id: 'test-project',
			file: 'index.js',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();

		expect(iframe?.getAttribute('frameborder')).toBe('no');
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
		expect(iframe?.getAttribute('title')).toBe(
			'stackblitz-test-project',
		);
		expect(iframe?.className).toBe('stackblitz-sveltekit-embed');

		const src = iframe?.getAttribute('src');
		expect(src).toContain('ctl=1'); // clickToLoad default true
		expect(src).toContain('hideExplorer=1'); // hideExplorer default true
		expect(src).toContain('hideNavigation=0'); // hideNavigation default false
		expect(src).toContain('theme=dark'); // theme default dark
	});

	it('should handle different view options', async () => {
		// Test editor view
		const { container: editorContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'editor',
			disable_observer: true,
		});
		const editorIframe = editorContainer.querySelector('iframe');
		expect(editorIframe?.getAttribute('src')).toContain(
			'view=editor',
		);

		// Test preview view
		const { container: previewContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'preview',
			disable_observer: true,
		});
		const previewIframe = previewContainer.querySelector('iframe');
		expect(previewIframe?.getAttribute('src')).toContain(
			'view=preview',
		);

		// Test default view (should not include view parameter)
		const { container: defaultContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			view: 'default',
			disable_observer: true,
		});
		const defaultIframe = defaultContainer.querySelector('iframe');
		expect(defaultIframe?.getAttribute('src')).not.toContain('view=');
	});

	it('should construct proper StackBlitz embed URL', async () => {
		const id = 'my-awesome-project';
		const file = 'src/components/App.svelte';
		const { container } = render(StackBlitz, {
			id,
			file,
			theme: 'light',
			view: 'editor',
			clickToLoad: false,
			disable_observer: true,
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
		const { container } = render(StackBlitz, {
			id,
			file,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(`stackblitz-${id}`);
		const src = iframe?.getAttribute('src');
		expect(src).toContain(id);
		expect(src).toContain(encodeURIComponent(file));
	});

	it('should have proper iframe accessibility attributes', async () => {
		const id = 'accessibility-test';
		const { container } = render(StackBlitz, {
			id,
			file: 'index.js',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(`stackblitz-${id}`);
		expect(iframe?.getAttribute('frameborder')).toBe('no');
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
		expect(iframe?.className).toBe('stackblitz-sveltekit-embed');
	});

	it('should handle very long id and file values', async () => {
		const id = 'a'.repeat(50);
		const file = 'b'.repeat(100) + '.js';
		const { container } = render(StackBlitz, {
			id,
			file,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(id);
		expect(src).toContain(encodeURIComponent(file));
	});

	it('should apply custom styles correctly', async () => {
		const customStyles =
			'border: 2px solid blue; background: yellow;';
		const { container } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			iframe_styles: customStyles,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.style.cssText).toContain('border: 2px solid blue');
		expect(iframe?.style.cssText).toContain('background: yellow');
	});

	it('should handle boolean configuration options', async () => {
		const { container } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			clickToLoad: true,
			hideNavigation: true,
			hideExplorer: false,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain('ctl=1');
		expect(src).toContain('hideNavigation=1');
		expect(src).toContain('hideExplorer=0');
	});

	it('should handle different theme options', async () => {
		// Test light theme
		const { container: lightContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'light',
			disable_observer: true,
		});
		const lightIframe = lightContainer.querySelector('iframe');
		expect(lightIframe?.getAttribute('src')).toContain('theme=light');

		// Test dark theme
		const { container: darkContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'dark',
			disable_observer: true,
		});
		const darkIframe = darkContainer.querySelector('iframe');
		expect(darkIframe?.getAttribute('src')).toContain('theme=dark');

		// Test custom theme
		const { container: customContainer } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			theme: 'custom-theme',
			disable_observer: true,
		});
		const customIframe = customContainer.querySelector('iframe');
		expect(customIframe?.getAttribute('src')).toContain(
			'theme=custom-theme',
		);
	});

	it('should handle custom dimensions', async () => {
		const { container } = render(StackBlitz, {
			id: 'test',
			file: 'index.js',
			width: '800px',
			height: '600px',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		// Default iframe_styles should incorporate custom dimensions
		expect(iframe?.style.cssText).toContain('height: 600px');
		expect(iframe?.style.cssText).toContain('width: 800px');
	});

	it('should handle missing file parameter gracefully', async () => {
		const { container } = render(StackBlitz, {
			id: 'test-project',
			file: undefined,
			disable_observer: true,
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
		const { container } = render(StackBlitz, {
			id: 'class-test',
			file: 'index.js',
			disable_observer: true,
		});

		const iframe = container.querySelector('iframe');
		expect(iframe?.className).toBe('stackblitz-sveltekit-embed');
	});

	it('should handle query parameter construction correctly', async () => {
		const { container } = render(StackBlitz, {
			id: 'test',
			file: 'app.js',
			view: 'editor',
			theme: 'light',
			clickToLoad: false,
			hideNavigation: true,
			hideExplorer: false,
			disable_observer: true,
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
});

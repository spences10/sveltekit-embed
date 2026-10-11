import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import SimpleCast from './simple-cast.svelte';

describe('SimpleCast', () => {
	it('mounts with default props', async () => {
		const { container } = await render(SimpleCast);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const episode_id = '12345';
		await render(SimpleCast, {
			episode_id,
			theme: 'dark',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episode_id}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('lazy loads the iframe by default', async () => {
		await render(SimpleCast, {
			episode_id: '67890',
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it.skip('should handle empty episode_id gracefully', async () => {
		await render(SimpleCast, {
			episode_id: '',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = 'https://player.simplecast.com/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		await render(SimpleCast, {});
		const iframe = page.getByTestId('simplecast-episode');
		// Default episode_id is '', theme is 'dark'
		const expected_src = 'https://player.simplecast.com/?dark=true';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', 'simplecast-');
	});

	it.skip('should handle different theme options', async () => {
		const episode_id = 'test123';

		// Test light theme
		await render(SimpleCast, {
			episode_id,
			theme: 'light',
		});
		const lightIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episode_id}`,
			);

		// Test dark theme
		await render(SimpleCast, {
			episode_id,
			theme: 'dark',
		});
		const darkIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episode_id}?dark=true`,
			);
	});

	it('should construct proper SimpleCast player URL', async () => {
		const episode_id = 'abc123def';
		await render(SimpleCast, {
			episode_id,
			theme: 'dark',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episode_id}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in episode_id', async () => {
		const episode_id = 'test-episode_123';
		await render(SimpleCast, {
			episode_id,
			theme: 'light',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episode_id}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episode_id}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const episode_id = 'accessibility-test';
		await render(SimpleCast, {
			episode_id,
		});
		const iframe = page.getByTestId('simplecast-episode');
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episode_id}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', 'no');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
		await expect.element(iframe).toHaveAttribute('seamless');
	});

	it('should handle very long episode_id values', async () => {
		const episode_id = 'a'.repeat(100);
		await render(SimpleCast, {
			episode_id,
			theme: 'light',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episode_id}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply custom CSS styles correctly', async () => {
		await render(SimpleCast, {
			episode_id: 'style-test',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const iframeElement = iframe.element() as HTMLIFrameElement;
		const styles = iframeElement.style;

		expect(styles.position).toBe('absolute');
		expect(styles.top).toBe('0px');
		expect(styles.left).toBe('0px');
		expect(styles.width).toBe('100%');
		expect(styles.height).toBe('100%');
	});

	it('should handle numeric height and width values', async () => {
		const { container } = await render(SimpleCast, {
			episode_id: 'numeric-test',
		});

		const embedDiv = container.querySelector(
			'.simplecast-episode-svelte-embed',
		);
		expect(embedDiv).toBeTruthy();
		const styles = (embedDiv as HTMLElement)?.style;
		expect(styles?.height).toBe('200px');
		expect(styles?.width).toBe('100%');
	});

	it('should handle malformed episode IDs gracefully', async () => {
		const episode_id = '12345/malformed?test=true&other=false';
		await render(SimpleCast, {
			episode_id,
			theme: 'dark',
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episode_id}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = await render(SimpleCast, {
			episode_id: 'class-test',
		});

		const embedDiv = container.querySelector(
			'.simplecast-episode-svelte-embed',
		);
		expect(embedDiv).toBeTruthy();
		expect(embedDiv?.className).toBe(
			'simplecast-episode-svelte-embed',
		);
	});

	it.skip('should handle theme parameter in URL correctly', async () => {
		const episode_id = 'url-test';

		// Test that non-dark themes don't add the parameter
		await render(SimpleCast, {
			episode_id,
			theme: 'light',
		});
		const lightIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episode_id}`,
			);

		// Test that dark theme adds the parameter
		await render(SimpleCast, {
			episode_id,
			theme: 'dark',
		});
		const darkIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episode_id}?dark=true`,
			);

		// Test custom theme value
		await render(SimpleCast, {
			episode_id,
			theme: 'custom',
		});
		const customIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(customIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episode_id}`,
			);
	});
});

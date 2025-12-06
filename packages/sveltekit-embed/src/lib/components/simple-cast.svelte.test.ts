import SimpleCast from '$lib/components/simple-cast.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('SimpleCast', () => {
	it('mounts with default props', async () => {
		const { container } = render(SimpleCast);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const episodeId = '12345';
		render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with a GeneralObserver', async () => {
		render(SimpleCast, {
			episodeId: '67890',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it.skip('should handle empty episodeId gracefully', async () => {
		render(SimpleCast, {
			episodeId: '',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = 'https://player.simplecast.com/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		render(SimpleCast, {
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		// Default episodeId is '', theme is 'dark'
		const expected_src = 'https://player.simplecast.com/?dark=true';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', 'simplecast-');
	});

	it.skip('should handle different theme options', async () => {
		const episodeId = 'test123';

		// Test light theme
		render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const lightIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);

		// Test dark theme
		render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const darkIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}?dark=true`,
			);
	});

	it('should construct proper SimpleCast player URL', async () => {
		const episodeId = 'abc123def';
		render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in episodeId', async () => {
		const episodeId = 'test-episode_123';
		render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episodeId}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const episodeId = 'accessibility-test';
		render(SimpleCast, {
			episodeId,
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episodeId}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', 'no');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
		await expect.element(iframe).toHaveAttribute('seamless');
	});

	it('should handle very long episodeId values', async () => {
		const episodeId = 'a'.repeat(100);
		render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply custom CSS styles correctly', async () => {
		render(SimpleCast, {
			episodeId: 'style-test',
			disable_observer: true,
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
		const { container } = render(SimpleCast, {
			episodeId: 'numeric-test',
			disable_observer: true,
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
		const episodeId = '12345/malformed?test=true&other=false';
		render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = page.getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = render(SimpleCast, {
			episodeId: 'class-test',
			disable_observer: true,
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
		const episodeId = 'url-test';

		// Test that non-dark themes don't add the parameter
		render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const lightIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);

		// Test that dark theme adds the parameter
		render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const darkIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}?dark=true`,
			);

		// Test custom theme value
		render(SimpleCast, {
			episodeId,
			theme: 'custom',
			disable_observer: true,
		});
		const customIframe = page.getByTestId('simplecast-episode');
		await expect
			.element(customIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);
	});
});

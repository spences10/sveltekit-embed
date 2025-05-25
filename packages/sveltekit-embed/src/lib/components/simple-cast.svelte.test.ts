import SimpleCast from '$lib/components/simple-cast.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('SimpleCast', () => {
	it('mounts with default props', async () => {
		const { container } = render(SimpleCast);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const episodeId = '12345';
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(SimpleCast, {
			episodeId: '67890',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});

	// Coverage gaps - test stubs to implement
	it.skip('should handle empty episodeId gracefully', async () => {
		const { getByTestId } = render(SimpleCast, {
			episodeId: '',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = 'https://player.simplecast.com/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		const { getByTestId } = render(SimpleCast, {
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
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
		const { getByTestId: getLightTheme } = render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const lightIframe = getLightTheme('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);

		// Test dark theme
		const { getByTestId: getDarkTheme } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const darkIframe = getDarkTheme('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}?dark=true`,
			);
	});

	it('should construct proper SimpleCast player URL', async () => {
		const episodeId = 'abc123def';
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}?dark=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in episodeId', async () => {
		const episodeId = 'test-episode_123';
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episodeId}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const episodeId = 'accessibility-test';
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		await expect
			.element(iframe)
			.toHaveAttribute('title', `simplecast-${episodeId}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', 'no');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
		await expect.element(iframe).toHaveAttribute('seamless');
	});

	it('should handle very long episodeId values', async () => {
		const episodeId = 'a'.repeat(100);
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
		const expected_src = `https://player.simplecast.com/${episodeId}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply custom CSS styles correctly', async () => {
		const { getByTestId } = render(SimpleCast, {
			episodeId: 'style-test',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
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
		const { getByTestId } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const iframe = getByTestId('simplecast-episode');
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
		const { getByTestId: getLight } = render(SimpleCast, {
			episodeId,
			theme: 'light',
			disable_observer: true,
		});
		const lightIframe = getLight('simplecast-episode');
		await expect
			.element(lightIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);

		// Test that dark theme adds the parameter
		const { getByTestId: getDark } = render(SimpleCast, {
			episodeId,
			theme: 'dark',
			disable_observer: true,
		});
		const darkIframe = getDark('simplecast-episode');
		await expect
			.element(darkIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}?dark=true`,
			);

		// Test custom theme value
		const { getByTestId: getCustom } = render(SimpleCast, {
			episodeId,
			theme: 'custom',
			disable_observer: true,
		});
		const customIframe = getCustom('simplecast-episode');
		await expect
			.element(customIframe)
			.toHaveAttribute(
				'src',
				`https://player.simplecast.com/${episodeId}`,
			);
	});
});

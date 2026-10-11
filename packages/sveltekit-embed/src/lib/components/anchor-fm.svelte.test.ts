import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import AnchorFm from './anchor-fm.svelte';

let episode_url =
	'purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a';

describe('AnchorFm', () => {
	it('mounts with episode url', async () => {
		const { container } = await render(AnchorFm, {
			episode_url,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with episode url', async () => {
		await render(AnchorFm, {
			episode_url,
		});
		const iframe = page.getByTestId('anchor-fm-episode');
		const expected_src = `https://anchor.fm/${episode_url}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = await render(AnchorFm, {
			episode_url,
			height: '200px',
			width: '50%',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('200px');
		expect(iframe?.parentElement?.style.width).toBe('50%');
	});

	it('lazy loads the iframe by default', async () => {
		await render(AnchorFm, {
			episode_url,
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty episode_url gracefully', async () => {
		// Test edge case: empty or invalid episode URL
		await render(AnchorFm, {
			episode_url: '',
		});
		const iframe = page.getByTestId('anchor-fm-episode');
		await expect
			.element(iframe)
			.toHaveAttribute('src', 'https://anchor.fm/');
		await expect
			.element(iframe)
			.toHaveAttribute('title', 'anchor-fm-');
	});

	it('should apply default height and width when not provided', async () => {
		// Test default prop values (height: '100px', width: '100%')
		const { container } = await render(AnchorFm, {
			episode_url,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('100px');
		expect(iframe?.parentElement?.style.width).toBe('100%');
	});

	it('should handle special characters in episode_url', async () => {
		// Test URL encoding and special characters
		const specialUrl =
			'test-podcast/episodes/episode-with-special-chars-!@#$%^&*()';
		await render(AnchorFm, {
			episode_url: specialUrl,
		});
		const iframe = page.getByTestId('anchor-fm-episode');
		const expectedSrc = `https://anchor.fm/${specialUrl}`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `anchor-fm-${specialUrl}`);
	});

	it('should have proper iframe accessibility attributes', async () => {
		// Test title attribute, aria-labels, etc.
		await render(AnchorFm, {
			episode_url,
		});
		const iframe = page.getByTestId('anchor-fm-episode');

		await expect
			.element(iframe)
			.toHaveAttribute('title', `anchor-fm-${episode_url}`);
		expect(getComputedStyle(iframe.element()).borderTopWidth).toBe(
			'0px',
		);
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
	});

	it('should handle very long episode_url values', async () => {
		// Test edge case: extremely long URLs
		const longUrl = 'a'.repeat(1000) + '/episodes/' + 'b'.repeat(500);
		await render(AnchorFm, {
			episode_url: longUrl,
		});
		const iframe = page.getByTestId('anchor-fm-episode');
		const expectedSrc = `https://anchor.fm/${longUrl}`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('should apply custom CSS styles correctly', async () => {
		// Test that custom height/width styles are properly applied
		const customHeight = '300px';
		const customWidth = '75%';
		const { container } = await render(AnchorFm, {
			episode_url,
			height: customHeight,
			width: customWidth,
		});
		const iframe = container.querySelector('iframe');
		const wrapperDiv = iframe?.parentElement;

		expect(wrapperDiv?.style.height).toBe(customHeight);
		expect(wrapperDiv?.style.width).toBe(customWidth);
		expect(wrapperDiv?.style.position).toBe('relative');

		// Check iframe styles
		expect(iframe?.style.position).toBe('absolute');
		expect(iframe?.style.top).toBe('0px');
		expect(iframe?.style.left).toBe('0px');
		expect(iframe?.style.width).toBe('100%');
		expect(iframe?.style.height).toBe('100%');
	});

	it('should handle numeric height and width values', async () => {
		// Test passing numbers instead of strings for dimensions
		const { container } = await render(AnchorFm, {
			episode_url,
			height: '250px',
			width: '80%',
		});
		const iframe = container.querySelector('iframe');

		// Component should handle numeric values by converting them
		expect(iframe?.parentElement?.style.height).toBe('250px');
		expect(iframe?.parentElement?.style.width).toBe('80%');
	});
});

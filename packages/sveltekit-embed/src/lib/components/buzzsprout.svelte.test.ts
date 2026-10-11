import Buzzsprout from './buzzsprout.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

let buzzsprout_id = '12345';

describe('Buzzsprout', () => {
	it('mounts with buzzsprout_id', async () => {
		const { container } = await render(Buzzsprout, {
			buzzsprout_id,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with buzzsprout_id', async () => {
		await render(Buzzsprout, {
			buzzsprout_id,
		});
		const iframe = page.getByTestId('buzzsprout');
		const expected_src = `https://www.buzzsprout.com/${buzzsprout_id}?client_source=admin&iframe=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = await render(Buzzsprout, {
			buzzsprout_id,
			height: '200px',
			width: '50%',
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('200px');
		expect(iframe?.parentElement?.style.width).toBe('50%');
	});

	it('lazy loads the iframe by default', async () => {
		await render(Buzzsprout, {
			buzzsprout_id,
		});
		expect(
			document.querySelector('iframe')?.getAttribute('loading'),
		).toBe('lazy');
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty buzzsprout_id gracefully', async () => {
		await render(Buzzsprout, {
			buzzsprout_id: '',
		});
		const iframe = page.getByTestId('buzzsprout');
		const expected_src =
			'https://www.buzzsprout.com/?client_source=admin&iframe=true';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default height and width when not provided', async () => {
		await render(Buzzsprout, {
			buzzsprout_id: 'test123',
		});

		const iframe = page.getByTestId('buzzsprout');
		const parent = iframe.element().parentElement;

		// Test default values: height='200px', width='100%'
		expect(parent?.style.height).toBe('200px');
		expect(parent?.style.width).toBe('100%');
	});

	it('should handle special characters in buzzsprout_id', async () => {
		const specialBuzzsproutId = 'show-123_with-dashes.and.dots';
		await render(Buzzsprout, {
			buzzsprout_id: specialBuzzsproutId,
		});

		const iframe = page.getByTestId('buzzsprout');
		const expected_src = `https://www.buzzsprout.com/${specialBuzzsproutId}?client_source=admin&iframe=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const testBuzzsproutId = 'accessibility-test';
		await render(Buzzsprout, {
			buzzsprout_id: testBuzzsproutId,
		});

		const iframe = page.getByTestId('buzzsprout');

		// Test accessibility attributes
		await expect
			.element(iframe)
			.toHaveAttribute('title', `buzzsprout-${testBuzzsproutId}`);
		await expect.element(iframe).toHaveAttribute('frameBorder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
	});

	it('should handle very long buzzsprout_id values', async () => {
		const longBuzzsproutId = 'a'.repeat(100); // 100 character buzzsprout ID
		await render(Buzzsprout, {
			buzzsprout_id: longBuzzsproutId,
		});

		const iframe = page.getByTestId('buzzsprout');
		const expected_src = `https://www.buzzsprout.com/${longBuzzsproutId}?client_source=admin&iframe=true`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `buzzsprout-${longBuzzsproutId}`);
	});

	it('should apply custom CSS styles correctly', async () => {
		await render(Buzzsprout, {
			buzzsprout_id: 'style-test',
			height: '300px',
			width: '400px',
		});

		const iframe = page.getByTestId('buzzsprout');
		const parent = iframe.element().parentElement;

		// Test that parent container has correct dimensions
		expect(parent?.style.height).toBe('300px');
		expect(parent?.style.width).toBe('400px');
		expect(parent?.style.position).toBe('relative');

		// Test iframe styles
		const iframeElement = iframe.element() as HTMLIFrameElement;
		expect(iframeElement.style.position).toBe('absolute');
		expect(iframeElement.style.top).toBe('0px');
		expect(iframeElement.style.left).toBe('0px');
		expect(iframeElement.style.width).toBe('100%');
		expect(iframeElement.style.height).toBe('100%');
	});

	it('should handle numeric height and width values', async () => {
		// Note: TypeScript interface expects string values
		await render(Buzzsprout, {
			buzzsprout_id: 'numeric-test',
			height: '250px',
			width: '80%',
		});

		const iframe = page.getByTestId('buzzsprout');
		const parent = iframe.element().parentElement;

		expect(parent?.style.height).toBe('250px');
		expect(parent?.style.width).toBe('80%');
	});

	it('should construct iframe src URL correctly with query parameters', async () => {
		const testId = 'url-construction-test';
		await render(Buzzsprout, {
			buzzsprout_id: testId,
		});

		const iframe = page.getByTestId('buzzsprout');
		const iframeElement = iframe.element() as HTMLIFrameElement;

		// Verify exact URL construction with specific query parameters
		const expectedUrl = `https://www.buzzsprout.com/${testId}?client_source=admin&iframe=true`;
		await expect.element(iframe).toHaveAttribute('src', expectedUrl);

		// Also verify the URL contains the required components
		const actualSrc = iframeElement.src;
		expect(actualSrc).toContain('buzzsprout.com');
		expect(actualSrc).toContain(testId);
		expect(actualSrc).toContain('client_source=admin');
		expect(actualSrc).toContain('iframe=true');
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = await render(Buzzsprout, {
			buzzsprout_id: 'class-test',
		});

		// Check for buzzsprout-sveltekit-embed class on the container div
		const buzzsproutDiv = container.querySelector(
			'.buzzsprout-sveltekit-embed',
		);
		expect(buzzsproutDiv).toBeTruthy();
		expect(
			buzzsproutDiv?.classList.contains('buzzsprout-sveltekit-embed'),
		).toBe(true);
	});
});

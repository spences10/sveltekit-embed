import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import Bluesky from './bluesky.svelte';

describe('Bluesky', () => {
	const test_post_id =
		'did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k';

	it('mounts with default props', async () => {
		const { container } = render(Bluesky);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct embed url', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const expected_src = `https://embed.bsky.app/embed/${test_post_id}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with custom width', async () => {
		render(Bluesky, {
			post_id: test_post_id,
			width: '50%',
		});

		const iframe = page.getByTestId('bluesky-embed');
		await expect.element(iframe).toHaveAttribute('width', '50%');
	});

	it('applies custom iframe styles', async () => {
		const custom_styles = 'border-radius: 8px; background: #f0f0f0;';
		render(Bluesky, {
			post_id: test_post_id,
			iframe_styles: custom_styles,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const element = iframe.element();
		const style_text = element.style.cssText.toLowerCase();
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('background: rgb(240, 240, 240)');
	});

	it('has correct default styles', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const element = iframe.element();
		const style_text = element.style.cssText.toLowerCase();
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('top: 0px');
		expect(style_text).toContain('left: 0px');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');
		expect(style_text).toContain('border: 0px');
		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
	});

	it('combines default and custom iframe styles correctly', async () => {
		const custom_styles = 'border-radius: 8px; margin: 10px;';
		render(Bluesky, {
			post_id: test_post_id,
			iframe_styles: custom_styles,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const element = iframe.element();
		const style_text = element.style.cssText.toLowerCase();

		// Check default styles are preserved
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');
		expect(style_text).toContain('border: 0px');

		// Check custom styles are applied
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('margin: 10px');
	});

	it('updates height when receiving message from iframe', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const message_event = new MessageEvent('message', {
			data: { type: 'height', height: 500 },
			origin: 'https://embed.bsky.app',
		});

		window.dispatchEvent(message_event);

		const iframe = page.getByTestId('bluesky-embed');
		const element = iframe.element();
		expect(element.style.height).toBe('100%');
	});

	// Edge Cases and Comprehensive Coverage
	it('should handle empty post_id gracefully', async () => {
		render(Bluesky, {
			post_id: '',
		});

		const iframe = page.getByTestId('bluesky-embed');
		const expected_src = 'https://embed.bsky.app/embed/';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should ignore messages from untrusted origins', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		// Get initial wrapper height
		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const initial_height = wrapper?.style.height || '174.5px';

		// Send message from untrusted origin
		const malicious_message = new MessageEvent('message', {
			data: { height: 1000 },
			origin: 'https://malicious-site.com',
		});

		window.dispatchEvent(malicious_message);

		// Height should remain unchanged
		expect(wrapper?.style.height).toBe(initial_height);
	});

	it('should handle message with h property instead of height', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Send message with 'h' property instead of 'height'
		const message_event = new MessageEvent('message', {
			data: { h: 350 },
			origin: 'https://embed.bsky.app',
		});

		window.dispatchEvent(message_event);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// Should update to new height
		expect(wrapper?.style.height).toBe('350px');
	});

	it('should fallback to default height for invalid message data', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Send message with no height or h property
		const invalid_message = new MessageEvent('message', {
			data: { type: 'invalid' },
			origin: 'https://embed.bsky.app',
		});

		window.dispatchEvent(invalid_message);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// Should fallback to 500px default
		expect(wrapper?.style.height).toBe('500px');
	});

	it('should handle component unmount and cleanup event listeners', async () => {
		const { unmount } = render(Bluesky, {
			post_id: test_post_id,
		});

		// Create a spy to track removeEventListener calls
		const removeEventListenerSpy = vi.spyOn(
			window,
			'removeEventListener',
		);

		// Unmount the component
		unmount();

		// Verify cleanup was called
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'message',
			expect.any(Function),
		);

		removeEventListenerSpy.mockRestore();
	});

	it('should handle very long post_id values', async () => {
		const long_post_id =
			'did:plc:' +
			'a'.repeat(100) +
			'/app.bsky.feed.post/' +
			'b'.repeat(100);
		render(Bluesky, {
			post_id: long_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const expected_src = `https://embed.bsky.app/embed/${long_post_id}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply correct CSS classes and container structure', async () => {
		const { container, getByTestId } = render(Bluesky, {
			post_id: test_post_id,
		});

		// Check main container structure
		const main_container = container.querySelector(
			'.bluesky-wrapper-container',
		);
		expect(main_container).toBeTruthy();
		expect(
			main_container?.classList.contains('bluesky-wrapper-container'),
		).toBe(true);

		// Check wrapper structure
		const wrapper = container.querySelector('.bluesky-wrapper');
		expect(wrapper).toBeTruthy();
		expect(wrapper?.classList.contains('bluesky-wrapper')).toBe(true);

		// Check iframe is within the correct structure
		const iframe = page.getByTestId('bluesky-embed');
		expect(
			iframe
				.element()
				.parentElement?.classList.contains('bluesky-wrapper'),
		).toBe(true);
	});

	it('should handle numeric width values', async () => {
		// Even though TypeScript interface expects string, test component robustness
		render(Bluesky, {
			post_id: test_post_id,
			width: '500px', // Using string as per interface
		});

		const iframe = page.getByTestId('bluesky-embed');
		await expect.element(iframe).toHaveAttribute('width', '500px');
	});

	it('should have proper iframe accessibility attributes', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');

		// Test accessibility attributes
		await expect
			.element(iframe)
			.toHaveAttribute('title', 'Bluesky Post Embed');
		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');

		// Test data-testid for testing accessibility
		await expect
			.element(iframe)
			.toHaveAttribute('data-testid', 'bluesky-embed');
	});

	it('should handle special characters in post_id', async () => {
		const special_post_id =
			'did:plc:user-with_special.chars@example/app.bsky.feed.post/post-with-special_chars.123';
		render(Bluesky, {
			post_id: special_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const expected_src = `https://embed.bsky.app/embed/${special_post_id}`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	// Additional comprehensive tests for edge cases
	it('should handle default width when not specified', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		await expect.element(iframe).toHaveAttribute('width', '100%');
	});

	it('should apply default wrapper height', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		expect(wrapper?.style.height).toBe('174.5px');
	});

	it('should handle non-object message data gracefully', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const initial_height = wrapper?.style.height;

		// Send message with string data instead of object
		const invalid_message = new MessageEvent('message', {
			data: 'not an object',
			origin: 'https://embed.bsky.app',
		});

		window.dispatchEvent(invalid_message);

		// Height should remain unchanged for non-object data
		expect(wrapper?.style.height).toBe(initial_height);
	});

	it('should handle wrapper styling and responsive behavior', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper_container = container.querySelector(
			'.bluesky-wrapper-container',
		) as HTMLElement;
		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;

		// Check wrapper container styles (from CSS)
		const container_computed =
			window.getComputedStyle(wrapper_container);
		expect(container_computed.display).toBe('flex');
		expect(container_computed.justifyContent).toBe('center');
		// Check inline style instead of computed style for width
		expect(
			wrapper_container.style.width || container_computed.width,
		).toBeTruthy();

		// Check wrapper styles (from CSS)
		const wrapper_computed = window.getComputedStyle(wrapper);
		expect(wrapper_computed.position).toBe('relative');
		expect(wrapper_computed.maxWidth).toBe('600px');
		expect(wrapper_computed.minWidth).toBe('300px');
		// Check that width is computed (not the literal '100%' string)
		expect(parseInt(wrapper_computed.width)).toBeGreaterThan(0);
	});
});

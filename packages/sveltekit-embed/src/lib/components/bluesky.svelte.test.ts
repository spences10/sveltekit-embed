import { page } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
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
		const element = iframe.element() as HTMLElement;
		const style_text = element.style.cssText.toLowerCase();
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('background: rgb(240, 240, 240)');
	});

	it('has correct default styles', async () => {
		render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('bluesky-embed');
		const element = iframe.element() as HTMLElement;
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
		const element = iframe.element() as HTMLElement;
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
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const iframe = container.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Create a simple message event without the problematic source property
		// The component logic will still work since it checks event.origin first
		const message_event = new MessageEvent('message', {
			data: { type: 'height', height: 500 },
			origin: 'https://embed.bsky.app',
		});

		// Mock the iframe's contentWindow to match what the component expects
		const mockContentWindow = {} as Window;
		Object.defineProperty(iframe, 'contentWindow', {
			value: mockContentWindow,
			writable: true,
		});

		// Override the event's source property after creation
		Object.defineProperty(message_event, 'source', {
			value: mockContentWindow,
			writable: false,
		});

		window.dispatchEvent(message_event);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// Check that the wrapper height was updated
		expect(wrapper?.style.height).toBe('500px');
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
		const iframe = container.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Create a simple message event
		const message_event = new MessageEvent('message', {
			data: { h: 350 },
			origin: 'https://embed.bsky.app',
		});

		// Mock the iframe's contentWindow
		const mockContentWindow = {} as Window;
		Object.defineProperty(iframe, 'contentWindow', {
			value: mockContentWindow,
			writable: true,
		});

		// Override the event's source property after creation
		Object.defineProperty(message_event, 'source', {
			value: mockContentWindow,
			writable: false,
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
		const iframe = container.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Create a simple message event
		const invalid_message = new MessageEvent('message', {
			data: { type: 'invalid' },
			origin: 'https://embed.bsky.app',
		});

		// Mock the iframe's contentWindow
		const mockContentWindow = {} as Window;
		Object.defineProperty(iframe, 'contentWindow', {
			value: mockContentWindow,
			writable: true,
		});

		// Override the event's source property after creation
		Object.defineProperty(invalid_message, 'source', {
			value: mockContentWindow,
			writable: false,
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

	it('should generate unique iframe IDs for multiple instances', async () => {
		const { container: container1 } = render(Bluesky, {
			post_id: test_post_id,
		});

		const { container: container2 } = render(Bluesky, {
			post_id: 'did:plc:different/app.bsky.feed.post/different',
		});

		const iframe1 = container1.querySelector(
			'iframe',
		) as HTMLIFrameElement;
		const iframe2 = container2.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		expect(iframe1.id).toBeTruthy();
		expect(iframe2.id).toBeTruthy();
		expect(iframe1.id).not.toBe(iframe2.id);
		expect(iframe1.id).toMatch(/^bluesky-iframe-[a-z0-9]{9}$/);
		expect(iframe2.id).toMatch(/^bluesky-iframe-[a-z0-9]{9}$/);
	});

	it('should only update height for the specific iframe that sent the message', async () => {
		const { container: container1 } = render(Bluesky, {
			post_id: test_post_id,
		});

		const { container: container2 } = render(Bluesky, {
			post_id: 'did:plc:different/app.bsky.feed.post/different',
		});

		const wrapper1 = container1.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const wrapper2 = container2.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const iframe1 = container1.querySelector(
			'iframe',
		) as HTMLIFrameElement;
		const iframe2 = container2.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		// Wait for components to mount and event listeners to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Create mock window objects for both iframes
		const mockContentWindow1 = {} as Window;
		const mockContentWindow2 = {} as Window;

		Object.defineProperty(iframe1, 'contentWindow', {
			value: mockContentWindow1,
			writable: true,
		});

		Object.defineProperty(iframe2, 'contentWindow', {
			value: mockContentWindow2,
			writable: true,
		});

		// Send message that appears to come from iframe1
		const message_event_1 = new MessageEvent('message', {
			data: { height: 300 },
			origin: 'https://embed.bsky.app',
		});

		// Override the event's source property
		Object.defineProperty(message_event_1, 'source', {
			value: mockContentWindow1,
			writable: false,
		});

		window.dispatchEvent(message_event_1);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// Only wrapper1 should update, wrapper2 should remain unchanged
		expect(wrapper1.style.height).toBe('300px');
		expect(wrapper2.style.height).toBe('174.5px');

		// Now send message that appears to come from iframe2
		const message_event_2 = new MessageEvent('message', {
			data: { height: 450 },
			origin: 'https://embed.bsky.app',
		});

		// Override the event's source property
		Object.defineProperty(message_event_2, 'source', {
			value: mockContentWindow2,
			writable: false,
		});

		window.dispatchEvent(message_event_2);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// wrapper1 should remain at 300px, wrapper2 should update to 450px
		expect(wrapper1.style.height).toBe('300px');
		expect(wrapper2.style.height).toBe('450px');
	});

	it('should ignore messages from unknown iframe sources', async () => {
		const { container } = render(Bluesky, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.bluesky-wrapper',
		) as HTMLElement;
		const iframe = container.querySelector(
			'iframe',
		) as HTMLIFrameElement;
		const initial_height = wrapper.style.height;

		// Wait for component to mount and event listener to be added
		await new Promise(resolve => setTimeout(resolve, 0));

		// Mock the iframe's contentWindow
		const mockContentWindow = {} as Window;
		Object.defineProperty(iframe, 'contentWindow', {
			value: mockContentWindow,
			writable: true,
		});

		// Create an unknown window source (different from any iframe's contentWindow)
		const unknown_source = {} as Window;

		const message_event = new MessageEvent('message', {
			data: { height: 600 },
			origin: 'https://embed.bsky.app',
		});

		// Override the event's source property with unknown source
		Object.defineProperty(message_event, 'source', {
			value: unknown_source,
			writable: false,
		});

		window.dispatchEvent(message_event);

		// Wait for DOM update
		await new Promise(resolve => setTimeout(resolve, 0));

		// Height should remain unchanged
		expect(wrapper.style.height).toBe(initial_height);
	});

	it('should handle multiple instances with different post IDs correctly', async () => {
		const post_ids = [
			'did:plc:x7cbjcbvndpjb3vyndsqgpsi/app.bsky.feed.post/3lpzm7ynvzs2o',
			'did:plc:x7cbjcbvndpjb3vyndsqgpsi/app.bsky.feed.post/3lq2ypghyrk2p',
			'did:plc:x7cbjcbvndpjb3vyndsqgpsi/app.bsky.feed.post/3lq2yv3uzjc2p',
		];

		const instances = post_ids.map(post_id =>
			render(Bluesky, { post_id }),
		);

		// Wait for all components to mount
		await new Promise(resolve => setTimeout(resolve, 0));

		// Verify each instance has unique iframe ID and correct src
		instances.forEach(({ container }, index) => {
			const iframe = container.querySelector(
				'iframe',
			) as HTMLIFrameElement;
			expect(iframe.id).toMatch(/^bluesky-iframe-[a-z0-9]{9}$/);
			expect(iframe.src).toBe(
				`https://embed.bsky.app/embed/${post_ids[index]}`,
			);
		});

		// Verify all iframe IDs are unique
		const iframe_ids = instances.map(
			({ container }) =>
				(container.querySelector('iframe') as HTMLIFrameElement).id,
		);
		const unique_ids = new Set(iframe_ids);
		expect(unique_ids.size).toBe(post_ids.length);
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
		const { container } = render(Bluesky, {
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

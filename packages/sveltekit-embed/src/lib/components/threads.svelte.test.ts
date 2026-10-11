import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Threads from './threads.svelte';

// Dispatch a message that looks like it came from the given iframe
const send_message = async (
	iframe: HTMLIFrameElement | null,
	data: unknown,
	origin = 'https://www.threads.com',
) => {
	// Wait for component to mount and event listener to be added
	await new Promise((resolve) => setTimeout(resolve, 0));

	const message_event = new MessageEvent('message', { data, origin });

	const mock_content_window = {} as Window;
	if (iframe) {
		Object.defineProperty(iframe, 'contentWindow', {
			value: mock_content_window,
			writable: true,
		});
	}

	// Override the event's source property after creation
	Object.defineProperty(message_event, 'source', {
		value: iframe ? mock_content_window : ({} as Window),
		writable: false,
	});

	window.dispatchEvent(message_event);

	// Wait for DOM update
	await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('Threads', () => {
	const test_post_id = 'DePOFVxEe_o';
	const default_height = '400px';

	it('mounts with default props', async () => {
		const { container } = await render(Threads);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct embed url', async () => {
		await render(Threads, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('threads-embed');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://www.threads.com/t/${test_post_id}/embed/`,
			);
	});

	it('renders with custom width', async () => {
		await render(Threads, {
			post_id: test_post_id,
			width: '50%',
		});

		const iframe = page.getByTestId('threads-embed');
		await expect.element(iframe).toHaveAttribute('width', '50%');
	});

	it('has correct default styles', async () => {
		await render(Threads, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('threads-embed');
		const element = iframe.element() as HTMLElement;
		const style_text = element.style.cssText.toLowerCase();
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('top: 0px');
		expect(style_text).toContain('left: 0px');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');
		expect(style_text).toContain('border: 0px');
		expect(style_text).toContain('border-radius: 12px');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
	});

	it('combines default and custom iframe styles correctly', async () => {
		await render(Threads, {
			post_id: test_post_id,
			iframe_styles: 'border-radius: 8px; margin: 10px;',
		});

		const iframe = page.getByTestId('threads-embed');
		const element = iframe.element() as HTMLElement;
		const style_text = element.style.cssText.toLowerCase();

		// Check default styles are preserved
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');

		// Check custom styles are applied
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('margin: 10px');
	});

	it('passes the theme to the embed', async () => {
		const { rerender } = await render(Threads, {
			post_id: test_post_id,
			theme: 'dark',
		});

		const iframe = page.getByTestId('threads-embed');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://www.threads.com/t/${test_post_id}/embed/?theme=dark`,
			);

		await rerender({ theme: 'auto' });

		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				`https://www.threads.com/t/${test_post_id}/embed/?theme=auto`,
			);
	});

	it('should apply default wrapper height', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;
		expect(wrapper.style.height).toBe(default_height);
	});

	it('updates height when receiving message from iframe', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		await send_message(container.querySelector('iframe'), 512);

		expect(wrapper.style.height).toBe('512px');
	});

	it('should accept messages from threads.net', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		await send_message(
			container.querySelector('iframe'),
			'350',
			'https://www.threads.net',
		);

		expect(wrapper.style.height).toBe('350px');
	});

	it('should ignore messages from untrusted origins', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		await send_message(
			container.querySelector('iframe'),
			1000,
			'https://malicious-site.com',
		);

		expect(wrapper.style.height).toBe(default_height);
	});

	it('should ignore messages from unknown iframe sources', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		await send_message(null, 600);

		expect(wrapper.style.height).toBe(default_height);
	});

	it('should ignore message data that is not a height', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;
		const iframe = container.querySelector('iframe');

		for (const data of [
			'not a number',
			{ height: 500 },
			0,
			-20,
			null,
		]) {
			await send_message(iframe, data);
			expect(wrapper.style.height).toBe(default_height);
		}
	});

	it('should only update height for the specific iframe that sent the message', async () => {
		const { container: container1 } = await render(Threads, {
			post_id: test_post_id,
		});
		const { container: container2 } = await render(Threads, {
			post_id: 'DePooaWH4X-',
		});

		const wrapper1 = container1.querySelector(
			'.threads-wrapper',
		) as HTMLElement;
		const wrapper2 = container2.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		await send_message(container1.querySelector('iframe'), 300);

		expect(wrapper1.style.height).toBe('300px');
		expect(wrapper2.style.height).toBe(default_height);

		await send_message(container2.querySelector('iframe'), 450);

		expect(wrapper1.style.height).toBe('300px');
		expect(wrapper2.style.height).toBe('450px');
	});

	it('should generate unique iframe IDs for multiple instances', async () => {
		const { container: container1 } = await render(Threads, {
			post_id: test_post_id,
		});
		const { container: container2 } = await render(Threads, {
			post_id: 'DePooaWH4X-',
		});

		const iframe1 = container1.querySelector(
			'iframe',
		) as HTMLIFrameElement;
		const iframe2 = container2.querySelector(
			'iframe',
		) as HTMLIFrameElement;

		expect(iframe1.id).toMatch(/^threads-iframe-.+$/);
		expect(iframe2.id).toMatch(/^threads-iframe-.+$/);
		expect(iframe1.id).not.toBe(iframe2.id);
	});

	it('should handle component unmount and cleanup event listeners', async () => {
		const { unmount } = await render(Threads, {
			post_id: test_post_id,
		});

		const remove_event_listener_spy = vi.spyOn(
			window,
			'removeEventListener',
		);

		await unmount();

		expect(
			remove_event_listener_spy.mock.calls.some(
				([type]) => type === 'message',
			),
		).toBe(true);

		remove_event_listener_spy.mockRestore();
	});

	it('should apply correct CSS classes and container structure', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		expect(
			container.querySelector('.threads-wrapper-container'),
		).toBeTruthy();

		const iframe = page.getByTestId('threads-embed');
		expect(
			iframe
				.element()
				.parentElement?.classList.contains('threads-wrapper'),
		).toBe(true);
	});

	it('should have proper iframe accessibility attributes', async () => {
		await render(Threads, {
			post_id: test_post_id,
		});

		const iframe = page.getByTestId('threads-embed');
		await expect
			.element(iframe)
			.toHaveAttribute('title', 'Threads Post Embed');
		expect(getComputedStyle(iframe.element()).borderTopWidth).toBe(
			'0px',
		);
	});

	it('should handle wrapper styling and responsive behavior', async () => {
		const { container } = await render(Threads, {
			post_id: test_post_id,
		});

		const wrapper_container = container.querySelector(
			'.threads-wrapper-container',
		) as HTMLElement;
		const wrapper = container.querySelector(
			'.threads-wrapper',
		) as HTMLElement;

		const container_computed =
			window.getComputedStyle(wrapper_container);
		expect(container_computed.display).toBe('flex');
		expect(container_computed.justifyContent).toBe('center');

		const wrapper_computed = window.getComputedStyle(wrapper);
		expect(wrapper_computed.position).toBe('relative');
		expect(wrapper_computed.maxWidth).toBe('658px');
		expect(wrapper_computed.minWidth).toBe('270px');
	});
});

import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { embed_loading } from './embed-loading.js';

const is_loading = (node: HTMLElement) =>
	'embedLoading' in node.dataset;

function mount(html = '') {
	const node = document.createElement('div');
	node.innerHTML = html;
	document.body.append(node);
	const detach = embed_loading(node);
	return { node, detach: detach as () => void };
}

afterEach(() => {
	document.body.replaceChildren();
	vi.useRealTimers();
});

describe('embed_loading', () => {
	it('is loading until the iframe inside has loaded', async () => {
		const { node } = mount();
		const iframe = document.createElement('iframe');
		iframe.src = 'about:blank';
		node.append(iframe);

		await expect.poll(() => is_loading(node)).toBe(false);
	});

	it('waits again when an iframe is given a new src', async () => {
		const { node } = mount();
		const iframe = document.createElement('iframe');
		iframe.src = 'about:blank';
		node.append(iframe);
		await expect.poll(() => is_loading(node)).toBe(false);

		// Never answers, so the new wait can't finish under the test
		iframe.src = 'http://10.255.255.1/';

		await expect.poll(() => is_loading(node)).toBe(true);
	});

	it('waits for a script based embed to add its iframe', async () => {
		const { node } = mount('<blockquote>Loading…</blockquote>');
		expect(is_loading(node)).toBe(true);

		const iframe = document.createElement('iframe');
		iframe.src = 'about:blank';
		node.querySelector('blockquote')!.replaceWith(iframe);

		await expect.poll(() => is_loading(node)).toBe(false);
	});

	it('gives up on an embed that never adds an iframe', () => {
		vi.useFakeTimers();
		const { node } = mount('<blockquote>Blocked</blockquote>');
		expect(is_loading(node)).toBe(true);

		vi.advanceTimersByTime(8000);

		expect(is_loading(node)).toBe(false);
	});

	it('clears the flag when detached', () => {
		const { node, detach } = mount();
		expect(is_loading(node)).toBe(true);

		detach();

		expect(is_loading(node)).toBe(false);
	});
});

import { afterEach, describe, expect, it, vi } from 'vitest';
import { in_view } from './in-view.js';

const make_node = (top: string) => {
	const node = document.createElement('div');
	node.style.cssText = `position: absolute; top: ${top}; left: 0; width: 100px; height: 100px;`;
	document.body.appendChild(node);
	return node;
};

describe('in_view', () => {
	const nodes: HTMLElement[] = [];
	const cleanups: Array<void | (() => void)> = [];

	afterEach(() => {
		for (const cleanup of cleanups.splice(0)) cleanup?.();
		for (const node of nodes.splice(0)) node.remove();
		window.scrollTo(0, 0);
	});

	it('calls on_enter for an element in the viewport', async () => {
		const node = make_node('0px');
		nodes.push(node);
		const on_enter = vi.fn();

		cleanups.push(in_view({ on_enter })(node));

		await vi.waitFor(() => expect(on_enter).toHaveBeenCalledTimes(1));
	});

	it('waits until an off-screen element is scrolled into view', async () => {
		const node = make_node('5000px');
		nodes.push(node);
		const on_enter = vi.fn();

		cleanups.push(in_view({ on_enter })(node));

		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(on_enter).not.toHaveBeenCalled();

		node.scrollIntoView();

		await vi.waitFor(() => expect(on_enter).toHaveBeenCalledTimes(1));
	});

	it('keeps observing and calls on_leave when once is false', async () => {
		const node = make_node('0px');
		nodes.push(node);
		const on_enter = vi.fn();
		const on_leave = vi.fn();

		cleanups.push(in_view({ on_enter, on_leave, once: false })(node));

		await vi.waitFor(() => expect(on_enter).toHaveBeenCalledTimes(1));

		node.style.top = '5000px';
		await vi.waitFor(() => expect(on_leave).toHaveBeenCalled());

		node.style.top = '0px';
		await vi.waitFor(() => expect(on_enter).toHaveBeenCalledTimes(2));
	});

	it('stops observing when the attachment is cleaned up', async () => {
		const node = make_node('5000px');
		nodes.push(node);
		const on_enter = vi.fn();

		const cleanup = in_view({ on_enter })(node);
		cleanup?.();
		node.scrollIntoView();

		await new Promise((resolve) => setTimeout(resolve, 150));
		expect(on_enter).not.toHaveBeenCalled();
	});
});

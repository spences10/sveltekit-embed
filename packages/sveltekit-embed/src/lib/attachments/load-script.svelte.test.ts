import { afterEach, describe, expect, it, vi } from 'vitest';
import { load_script } from './load-script.js';

const src = 'https://example.test/embed.js';
const scripts = () =>
	[...document.querySelectorAll<HTMLScriptElement>('script')].filter(
		(script) => script.src === src,
	);

describe('load_script', () => {
	const node = document.createElement('div');
	const cleanups: Array<void | (() => void)> = [];

	afterEach(() => {
		for (const cleanup of cleanups.splice(0)) cleanup?.();
	});

	it('appends an async script to the head by default', () => {
		cleanups.push(load_script(src)(node));

		expect(scripts()).toHaveLength(1);
		expect(scripts()[0].async).toBe(true);
		expect(scripts()[0].parentNode).toBe(document.head);
	});

	it('appends to the body when asked', () => {
		cleanups.push(load_script(src, { parent: 'body' })(node));

		expect(scripts()[0].parentNode).toBe(document.body);
	});

	it('appends one script per attached element', () => {
		cleanups.push(load_script(src)(node));
		cleanups.push(load_script(src)(document.createElement('div')));

		expect(scripts()).toHaveLength(2);
	});

	it('calls on_load when the script loads', () => {
		const on_load = vi.fn();
		cleanups.push(load_script(src, { on_load })(node));

		scripts()[0].dispatchEvent(new Event('load'));

		expect(on_load).toHaveBeenCalledTimes(1);
	});

	it('removes the script on cleanup', () => {
		const cleanup = load_script(src)(node);
		expect(scripts()).toHaveLength(1);

		cleanup?.();

		expect(scripts()).toHaveLength(0);
	});
});

import StackBlitz from '$lib/components/stackblitz.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('StackBlitz', () => {
	afterEach(() => cleanup());

	it('mounts with default values', async () => {
		const { container } = render(StackBlitz, {
			id: 'my-id',
			file: 'index.html',
			disable_observer: true,
		});

		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const id = 'my-id';
		const { getByTitle } = render(StackBlitz, {
			id,
			file: 'index.html',
			disable_observer: true,
		});
		const iframe = getByTitle(`stackblitz-${id}`);

		const expected_src = `https://stackblitz.com/edit/${id}?embed=1&ctl=1&hideExplorer=1&hideNavigation=0&theme=dark&file=index.html`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(StackBlitz, {
			id: 'my-id',
			file: 'index.html',
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('style')).toContain('height: 200px;');
		expect(iframe?.getAttribute('style')).toContain('width: 50%;');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(StackBlitz, {
			id: 'my-id',
			file: 'index.html',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');

		expect(general_observer).toBeTruthy();
	});
});

import Gist from '$lib/components/gist.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

const gistUri = 'gauravchl';

describe('Gist', () => {
	afterEach(() => cleanup());

	it('mounts with default props', async () => {
		const { container } = render(Gist);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const { getByTitle } = render(Gist, {
			gistUri,
			disable_observer: true,
		});
		const iframe = getByTitle('gist-widget');
		const expected_src = `https://gist.github.com/${gistUri}.pibb`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Gist, {
			gistUri,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('style')).toContain(`height: 200px`);
		expect(iframe?.getAttribute('style')).toContain(`width: 50%`);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Gist, {
			gistUri,
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

import Buzzsprout from '$lib/components/buzzsprout.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

let buzzsproutId = '12345';

describe('Buzzsprout', () => {
	afterEach(() => cleanup());

	it('mounts with buzzsproutId', async () => {
		const { container } = render(Buzzsprout, {
			buzzsproutId,
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with buzzsproutId', async () => {
		const { getByTestId } = render(Buzzsprout, {
			buzzsproutId,
			disable_observer: true,
		});
		const iframe = getByTestId('buzzsprout');
		const expected_src = `https://www.buzzsprout.com/${buzzsproutId}?client_source=admin&amp;iframe=true`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Buzzsprout, {
			buzzsproutId,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('200px');
		expect(iframe?.parentElement?.style.width).toBe('50%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Buzzsprout, {
			buzzsproutId,
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

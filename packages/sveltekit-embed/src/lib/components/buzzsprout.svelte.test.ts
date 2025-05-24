import Buzzsprout from '$lib/components/buzzsprout.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

let buzzsproutId = '12345';

describe('Buzzsprout', () => {
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
		await expect.element(iframe).toHaveAttribute('src', expected_src);
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

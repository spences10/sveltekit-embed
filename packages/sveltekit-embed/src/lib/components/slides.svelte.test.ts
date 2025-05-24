import Slides from '$lib/components/slides.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Slides', () => {
	it('mounts with default props', async () => {
		const { container } = render(Slides);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const username = 'my-username';
		const title = 'my-slides';

		const { getByTitle } = render(Slides, {
			username,
			title,
			byline: 'visible',
			share: 'visible',
			style: 'light',
			disable_observer: true,
		});

		const iframe = getByTitle(title, { exact: false });
		const expected_src = `https://slides.com/${username}/${title}/embed?&style=light&byline=visible&share=visible`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Slides, {
			width: '80%',
			height: '300px',
			username: 'my-username',
			title: 'my-slides',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('width')).toBe('80%');
			expect(iframe.getAttribute('height')).toBe('300px');
		}
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Slides, {
			username: 'my-username',
			title: 'my-slides',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

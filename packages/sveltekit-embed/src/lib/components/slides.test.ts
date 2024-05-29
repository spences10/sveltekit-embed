import Slides from '$lib/components/slides.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('Slides', () => {
	afterEach(cleanup);

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
		expect(iframe.getAttribute('src')).toBe(expected_src);
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

		expect(iframe?.getAttribute('width')).toBe('80%');
		expect(iframe?.getAttribute('height')).toBe('300px');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Slides, {
			username: 'my-username',
			title: 'my-slides',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

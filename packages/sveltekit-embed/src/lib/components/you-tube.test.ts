import YouTube from '$lib/components/you-tube.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

describe('YouTube', () => {
	afterEach(() => cleanup());

	it('mounts with video id', async () => {
		const { container } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src for video', async () => {
		const { getByTitle } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=false&start=0`;
		expect(iframe.getAttribute('src')).toBe(expectedSrc);
	});

	it('renders iframe with correct src for playlist', async () => {
		const listId = '123abc';
		const { getByTitle } = render(YouTube, {
			youTubeId: '',
			listId,
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = getByTitle(`youTube-${listId}`);
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries?list=${listId}`;
		expect(iframe.getAttribute('src')).toBe(expectedSrc);
	});

	it('sets aspect ratio using padding-top style', async () => {
		const { getByTestId } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '4:3',
			iframe_styles: 'border-radius: 0.8rem;',
			disable_observer: true,
		});

		const iframe = getByTestId('youTube');
		const iframeWrapper = iframe.parentElement;

		expect(iframeWrapper?.getAttribute('style')).toContain(
			'padding-top: 75%;',
		);
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: false,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		expect(general_observer).toBeTruthy();
	});
});

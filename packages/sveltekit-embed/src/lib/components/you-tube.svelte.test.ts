import YouTube from '$lib/components/you-tube.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('YouTube', () => {
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

	it('renders iframe with correct src for video with default options', async () => {
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
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for video with custom options', async () => {
		const { getByTitle } = render(YouTube, {
			youTubeId: 'abc123',
			listId: '',
			autoPlay: true,
			mute: true,
			controls: false,
			loop: true,
			modestBranding: true,
			rel: true,
			skipTo: { h: 0, m: 0, s: 0 },
			aspectRatio: '16:9',
			iframe_styles: '',
			disable_observer: true,
		});
		const iframe = getByTitle('youTube-abc123');
		const expectedSrc = `https://www.youtube-nocookie.com/embed/abc123?autoplay=1&start=0&mute=1&controls=0&loop=1&modestbranding=1&rel=1`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
	});

	it('renders iframe with correct src for playlist with default options', async () => {
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
		const expectedSrc = `https://www.youtube-nocookie.com/embed/?videoseries&list=${listId}&index=0&autoplay=0&start=0&mute=0&controls=1&loop=0&modestbranding=0&rel=0`;
		await expect.element(iframe).toHaveAttribute('src', expectedSrc);
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
		const iframeElement = iframe.element();
		const iframeWrapper = iframeElement.parentElement;

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
		await expect.element(general_observer).toBeInTheDocument();
	});
});

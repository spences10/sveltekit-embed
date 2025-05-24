import TikTok from '$lib/components/tiktok.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('TikTok', () => {
	it('mounts with default props', async () => {
		const { container } = render(TikTok, {
			tiktokId: '6718335390845095173',
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const tiktokId = '6718335390845095173';
		const { getByTestId } = render(TikTok, {
			tiktokId,
			disable_observer: true,
		});
		const iframe = getByTestId('tiktok-embed');
		const expected_src = `https://www.tiktok.com/player/v1/${tiktokId}?controls=1&progress_bar=1&play_button=1&volume_control=1&fullscreen_button=1&timestamp=1&loop=0&autoplay=0&music_info=0&description=0&rel=1&native_context_menu=1&closed_caption=1`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(TikTok, {
			tiktokId: '6718335390845095173',
			height: '400px',
			width: '50%',
			disable_observer: true,
		});
		const div = container.querySelector('.tiktok-sveltekit-embed');

		expect(div?.getAttribute('style')).toContain('height: 400px');
		expect(div?.getAttribute('style')).toContain('width: 50%');
	});

	it('renders with custom options', async () => {
		const tiktokId = '6718335390845095173';
		const { getByTestId } = render(TikTok, {
			tiktokId,
			controls: false,
			loop: true,
			autoplay: true,
			music_info: true,
			description: true,
			disable_observer: true,
		});
		const iframe = getByTestId('tiktok-embed');
		const element = iframe.element();
		const src = element.getAttribute('src');

		expect(src).toContain('controls=0');
		expect(src).toContain('loop=1');
		expect(src).toContain('autoplay=1');
		expect(src).toContain('music_info=1');
		expect(src).toContain('description=1');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(TikTok, {
			tiktokId: '6718335390845095173',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

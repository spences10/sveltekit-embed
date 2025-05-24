import GenericEmbed from '$lib/components/generic-embed.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('GenericEmbed', () => {
	it('mounts with default props', async () => {
		const { container } = render(GenericEmbed);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src and props', async () => {
		const src = 'https://www.youtube.com/watch?v=o-YBDTqX_ZU';
		const title =
			'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)';
		const height = '500px';
		const width = '100%';
		const { getByTitle } = render(GenericEmbed, {
			src,
			title,
			height,
			width,
			disable_observer: true,
		});
		const iframe = getByTitle(title);

		await expect.element(iframe).toHaveAttribute('src', src);
		await expect.element(iframe).toHaveAttribute('height', height);
		await expect.element(iframe).toHaveAttribute('width', width);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(GenericEmbed, {
			src: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU',
			title:
				'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)',
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('height')).toBe('200px');
			expect(iframe.getAttribute('width')).toBe('50%');
		}
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(GenericEmbed, {
			src: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU',
			title:
				'Rick Astley - Never Gonna Give You Up (Remastered 4K 60fps,AI)',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

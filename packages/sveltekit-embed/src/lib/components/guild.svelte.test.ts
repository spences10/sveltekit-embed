import Guild from '$lib/components/guild.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Guild', () => {
	it('mounts with default props', async () => {
		const { container } = render(Guild, { card_id: '1234' });
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const card_id = '12345';
		const { getByTestId } = render(Guild, {
			height: '420px',
			width: '500px',
			card_id,
			type: 'user',
			display_type: 'item',
			disable_observer: true,
		});
		const iframe = getByTestId('guild-card');
		const expected_src = `https://guild.host/embeds/user/${card_id}/item`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Guild, {
			height: '350px',
			width: '80%',
			card_id: '67890',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.parentElement?.style.height).toBe('350px');
		expect(iframe?.parentElement?.style.width).toBe('80%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(Guild, {
			height: '400px',
			width: '600px',
			card_id: 'abcde',
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

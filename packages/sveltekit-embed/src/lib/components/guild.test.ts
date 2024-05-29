import Guild from '$lib/components/guild.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('Guild', () => {
	afterEach(cleanup);

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
		const expected_src = `https://beta.guild.host/embeds/user/${card_id}/item`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
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
		expect(general_observer).toBeTruthy();
	});
});

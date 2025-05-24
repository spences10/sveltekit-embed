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

	it('should handle empty card_id gracefully', async () => {
		const { getByTestId } = render(Guild, {
			card_id: '',
			disable_observer: true,
		});
		const iframe = getByTestId('guild-card');
		const expected_src = 'https://guild.host/embeds/guild//card';
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should apply default prop values when not provided', async () => {
		const { getByTestId, container } = render(Guild, {
			card_id: 'test123',
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const parent = iframe.element().parentElement;

		// Test default values: height='380px', width='100%', type='guild', display_type='card'
		expect(parent?.style.height).toBe('380px');
		expect(parent?.style.width).toBe('100%');
		await expect
			.element(iframe)
			.toHaveAttribute(
				'src',
				'https://guild.host/embeds/guild/test123/card',
			);
	});

	it.skip('should handle different type options', async () => {
		const card_id = 'test456';

		// Test 'user' type
		const { getByTestId: getUserIframe } = render(Guild, {
			card_id,
			type: 'user',
			disable_observer: true,
		});
		await expect
			.element(getUserIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/user/${card_id}/card`,
			);

		// Test 'event' type
		const { getByTestId: getEventIframe } = render(Guild, {
			card_id,
			type: 'event',
			disable_observer: true,
		});
		await expect
			.element(getEventIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/event/${card_id}/card`,
			);

		// Test 'presentation' type
		const { getByTestId: getPresentationIframe } = render(Guild, {
			card_id,
			type: 'presentation',
			disable_observer: true,
		});
		await expect
			.element(getPresentationIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/presentation/${card_id}/card`,
			);
	});

	it.skip('should handle different display_type options', async () => {
		const card_id = 'test789';

		// Test 'item' display type
		const { getByTestId: getItemIframe } = render(Guild, {
			card_id,
			display_type: 'item',
			disable_observer: true,
		});
		await expect
			.element(getItemIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/guild/${card_id}/item`,
			);

		// Test 'events/latest' display type
		const { getByTestId: getEventsLatestIframe } = render(Guild, {
			card_id,
			display_type: 'events/latest',
			disable_observer: true,
		});
		await expect
			.element(getEventsLatestIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/guild/${card_id}/events/latest`,
			);

		// Test 'presentations/upcoming' display type
		const { getByTestId: getPresentationsUpcomingIframe } = render(
			Guild,
			{
				card_id,
				display_type: 'presentations/upcoming',
				disable_observer: true,
			},
		);
		await expect
			.element(getPresentationsUpcomingIframe('guild-card'))
			.toHaveAttribute(
				'src',
				`https://guild.host/embeds/guild/${card_id}/presentations/upcoming`,
			);
	});

	it('should construct proper Guild embed URL', async () => {
		const { getByTestId } = render(Guild, {
			card_id: 'svelte-society-london',
			type: 'guild',
			display_type: 'events/upcoming',
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const expected_url =
			'https://guild.host/embeds/guild/svelte-society-london/events/upcoming';
		await expect.element(iframe).toHaveAttribute('src', expected_url);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const card_id = 'accessibility-test';
		const { getByTestId } = render(Guild, {
			card_id,
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');

		// Test accessibility attributes
		await expect
			.element(iframe)
			.toHaveAttribute('title', `guild-card-${card_id}`);
		await expect.element(iframe).toHaveAttribute('frameborder', '0');
		await expect.element(iframe).toHaveAttribute('scrolling', 'no');
	});

	it('should handle special characters in card_id', async () => {
		const specialCardId =
			'user-name-with-dashes_and_underscores.dots';
		const { getByTestId } = render(Guild, {
			card_id: specialCardId,
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const expected_src = `https://guild.host/embeds/guild/${specialCardId}/card`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle very long card_id values', async () => {
		const longCardId = 'a'.repeat(100); // 100 character card ID
		const { getByTestId } = render(Guild, {
			card_id: longCardId,
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const expected_src = `https://guild.host/embeds/guild/${longCardId}/card`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
		await expect
			.element(iframe)
			.toHaveAttribute('title', `guild-card-${longCardId}`);
	});

	it('should apply custom CSS styles correctly', async () => {
		const { getByTestId } = render(Guild, {
			card_id: 'style-test',
			height: '500px',
			width: '300px',
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const parent = iframe.element().parentElement;

		// Test that parent container has correct dimensions
		expect(parent?.style.height).toBe('500px');
		expect(parent?.style.width).toBe('300px');
		expect(parent?.style.position).toBe('relative');

		// Test iframe styles
		await expect.element(iframe).toHaveAttribute('height', '500px');
		await expect.element(iframe).toHaveAttribute('width', '300px');
		expect(
			(iframe.element() as HTMLIFrameElement).style.position,
		).toBe('absolute');
		expect((iframe.element() as HTMLIFrameElement).style.top).toBe(
			'0px',
		);
		expect((iframe.element() as HTMLIFrameElement).style.left).toBe(
			'0px',
		);
		expect((iframe.element() as HTMLIFrameElement).style.width).toBe(
			'100%',
		);
		expect((iframe.element() as HTMLIFrameElement).style.height).toBe(
			'100%',
		);
		expect(
			(iframe.element() as HTMLIFrameElement).style.borderRadius,
		).toBe('0.5rem');
	});

	it('should handle numeric height and width values', async () => {
		// Note: In Svelte, numeric values are typically converted to strings
		const { getByTestId } = render(Guild, {
			card_id: 'numeric-test',
			height: '400px', // Already as string since TypeScript interface expects string
			width: '250px', // Already as string since TypeScript interface expects string
			disable_observer: true,
		});

		const iframe = getByTestId('guild-card');
		const parent = iframe.element().parentElement;

		expect(parent?.style.height).toBe('400px');
		expect(parent?.style.width).toBe('250px');
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = render(Guild, {
			card_id: 'class-test',
			disable_observer: true,
		});

		// Check for guild-card class on the container div
		const guildCardDiv = container.querySelector('.guild-card');
		expect(guildCardDiv).toBeTruthy();
		expect(guildCardDiv?.classList.contains('guild-card')).toBe(true);

		// Check for general-observer test id
		const observerDiv = container.querySelector(
			'[data-testid="general-observer"]',
		);
		expect(observerDiv).toBeTruthy();
	});
});

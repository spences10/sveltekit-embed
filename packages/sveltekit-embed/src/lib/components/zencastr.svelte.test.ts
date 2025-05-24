import Zencastr from '$lib/components/zencastr.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Zencastr', () => {
	it('mounts', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		expect(container).toBeTruthy();
	});

	it('sets data-episode-href for Zencastr player', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const player = container.querySelector('blockquote');

		expect(player).toBeTruthy();
		if (player) {
			expect(player.getAttribute('data-episode-href')).toBe(
				'https://zencastr.com/embed/abc123'
			);
		}
	});

	it('sets href for Zencastr player link', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const link = container.querySelector('a');

		expect(link).toBeTruthy();
		if (link) {
			expect(link.getAttribute('href')).toBe(
				'https://zencastr.com/embed/abc123'
			);
		}
	});
});

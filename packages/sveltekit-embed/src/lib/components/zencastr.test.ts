import Zencastr from '$lib/components/zencastr.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

describe('Zencastr', () => {
	afterEach(() => cleanup());

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

		expect(player?.getAttribute('data-episode-href')).toBe(
			'https://zencastr.com/embed/abc123',
		);
	});

	it('sets href for Zencastr player link', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const link = container.querySelector('a');

		expect(link?.getAttribute('href')).toBe(
			'https://zencastr.com/embed/abc123',
		);
	});
});

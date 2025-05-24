import Toot from '$lib/components/toot.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

describe('Toot', () => {
	it('renders iframe with correct src', async () => {
		const instance = 'my-instance';
		const username = 'my-username';
		const tootId = '123';

		const { getByTitle } = render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = getByTitle('');

		const expected_src = `https://${instance}/@${username}/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('renders with a default width', async () => {
		const instance = 'my-instance';
		const username = 'my-username';
		const tootId = '123';

		const { container } = render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = container.querySelector('iframe');

		if (iframe) {
			await expect.element(iframe).toHaveAttribute('width', '400');
		}
	});
});

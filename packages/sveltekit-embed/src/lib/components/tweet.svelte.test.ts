import Tweet from '$lib/components/tweet.svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

describe('Tweet', () => {
	it('mounts with default values', async () => {
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
		});

		expect(container).toBeTruthy();
	});

	it('renders tweet with correct link', async () => {
		const tweetLink = 'twitterdev/status/1399879412994844160';

		const { getByText } = render(Tweet, {
			tweetLink,
		});
		const tweetElement = getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
	});
});

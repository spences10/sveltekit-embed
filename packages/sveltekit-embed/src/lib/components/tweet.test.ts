import Tweet from '$lib/components/tweet.svelte';
import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

describe('Tweet', () => {
	afterEach(() => cleanup());

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

		expect(tweetElement.getAttribute('href')).toBe(
			`https://twitter.com/${tweetLink}`,
		);
	});
});

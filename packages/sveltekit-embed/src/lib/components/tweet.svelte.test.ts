import Tweet from './tweet.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Tweet', () => {
	it('mounts with default values', async () => {
		const { container } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		expect(container).toBeTruthy();
	});

	it('renders tweet with correct link', async () => {
		const tweet_link = 'twitterdev/status/1399879412994844160';

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweet_link}`);
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty tweet_link gracefully', async () => {
		const tweet_link = '';

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', 'https://twitter.com/');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		const wrapper = container.querySelector('.tweet-wrapper');
		const blockquote = container.querySelector('.twitter-tweet');

		expect(wrapper).toBeTruthy();
		expect(blockquote).toBeTruthy();

		if (wrapper && blockquote) {
			await expect
				.element(wrapper as HTMLElement)
				.toHaveAttribute('data-theme', 'light');
			await expect
				.element(blockquote as HTMLElement)
				.toHaveAttribute('data-theme', 'light');
		}
	});

	it('should handle special characters in tweet_link', async () => {
		const tweet_link = 'user.name/status/123_456';

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweet_link}`);
	});

	it('should construct proper Twitter embed URL', async () => {
		const tweet_link = 'username/status/123456789';

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		const expectedHref = `https://twitter.com/${tweet_link}`;
		await expect
			.element(tweetElement)
			.toHaveAttribute('href', expectedHref);
	});

	it('should handle very long tweet_link values', async () => {
		const tweet_link = `${'a'.repeat(50)}/status/${'1'.repeat(20)}`;

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweet_link}`);
	});

	it('should apply custom CSS styles correctly', async () => {
		const { container } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
			theme: 'dark',
		});

		const wrapper = container.querySelector('.tweet-wrapper');
		const blockquote = container.querySelector('.twitter-tweet');

		expect(wrapper).toBeTruthy();
		expect(blockquote).toBeTruthy();

		if (wrapper && blockquote) {
			const wrapperElement = wrapper as HTMLDivElement;
			const blockquoteElement = blockquote as HTMLElement;

			// Check computed styles
			const wrapperStyles = window.getComputedStyle(wrapperElement);
			expect(wrapperStyles.display).toBe('flex');
			expect(wrapperStyles.justifyContent).toBe('center');

			await expect
				.element(wrapper as HTMLElement)
				.toHaveAttribute('data-theme', 'dark');
			await expect
				.element(blockquote as HTMLElement)
				.toHaveAttribute('data-theme', 'dark');
		}
	});

	it('should handle malformed tweet links gracefully', async () => {
		const tweet_link = 'invalid/format/link';

		await render(Tweet, {
			tweet_link,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweet_link}`);
	});

	it('should render loading state properly', async () => {
		await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		const loadingText = page.getByText('Loading Tweet...');
		await expect.element(loadingText).toBeInTheDocument();
	});

	it.skip('should handle Twitter script loading', async () => {
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');

		await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		expect(createElementSpy).toHaveBeenCalledWith('script');
		expect(mockScript.src).toBe(
			'https://platform.twitter.com/widgets.js',
		);
		expect(mockScript.async).toBe(true);
		expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it.skip('should handle component unmount and cleanup', async () => {
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');
		const removeChildSpy = vi.spyOn(document.head, 'removeChild');

		const { unmount } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		// Unmount component
		await unmount();

		expect(removeChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
		removeChildSpy.mockRestore();
	});

	it.skip('should have proper accessibility attributes', async () => {
		const { container } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		const link = container.querySelector('a');
		expect(link).toBeTruthy();

		if (link) {
			const linkElement = link as HTMLAnchorElement;
			expect(linkElement.textContent).toBe('Loading Tweet...');
			expect(linkElement.style.color).toBe('rgb(29, 161, 242)'); // Twitter blue
			expect(linkElement.style.fontWeight).toBe('bold');
			expect(linkElement.style.textDecoration).toBe('none');
		}
	});

	it.skip('should handle different tweet link formats', async () => {
		const testCases = [
			'username/status/123456789',
			'user.name/status/987654321',
			'test_user/status/111222333',
			'user123/status/456789012',
		];

		for (const tweet_link of testCases) {
			await render(Tweet, {
				tweet_link,
			});
			const tweetElement = page.getByText('Loading Tweet...');

			await expect
				.element(tweetElement)
				.toHaveAttribute('href', `https://twitter.com/${tweet_link}`);
		}
	});

	it.skip('should not load duplicate Twitter scripts', async () => {
		// Mock existing script detection
		const existingScript = document.createElement('script');
		existingScript.src = 'https://platform.twitter.com/widgets.js';
		document.head.appendChild(existingScript);

		const createElementSpy = vi.spyOn(document, 'createElement');
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');

		await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
		});

		// Should not create a new script since one already exists
		expect(createElementSpy).not.toHaveBeenCalled();
		expect(appendChildSpy).not.toHaveBeenCalled();

		// Cleanup
		document.head.removeChild(existingScript);
		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should handle theme prop correctly', async () => {
		const { container } = await render(Tweet, {
			tweet_link: 'twitterdev/status/1399879412994844160',
			theme: 'dark',
		});

		const wrapper = container.querySelector('.tweet-wrapper');
		const blockquote = container.querySelector('.twitter-tweet');

		expect(wrapper).toBeTruthy();
		expect(blockquote).toBeTruthy();

		if (wrapper && blockquote) {
			await expect
				.element(wrapper as HTMLElement)
				.toHaveAttribute('data-theme', 'dark');
			await expect
				.element(blockquote as HTMLElement)
				.toHaveAttribute('data-theme', 'dark');
		}
	});
});

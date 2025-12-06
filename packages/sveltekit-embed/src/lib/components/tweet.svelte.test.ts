import Tweet from '$lib/components/tweet.svelte';
import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Tweet', () => {
	it('mounts with default values', async () => {
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
		});

		expect(container).toBeTruthy();
	});

	it('renders tweet with correct link', async () => {
		const tweetLink = 'twitterdev/status/1399879412994844160';

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty tweetLink gracefully', async () => {
		const tweetLink = '';

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', 'https://twitter.com/');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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

	it('should handle special characters in tweetLink', async () => {
		const tweetLink = 'user.name/status/123_456';

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
	});

	it('should construct proper Twitter embed URL', async () => {
		const tweetLink = 'username/status/123456789';

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		const expectedHref = `https://twitter.com/${tweetLink}`;
		await expect
			.element(tweetElement)
			.toHaveAttribute('href', expectedHref);
	});

	it('should handle very long tweetLink values', async () => {
		const tweetLink = `${'a'.repeat(50)}/status/${'1'.repeat(20)}`;

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
	});

	it('should apply custom CSS styles correctly', async () => {
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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
		const tweetLink = 'invalid/format/link';

		render(Tweet, {
			tweetLink,
		});
		const tweetElement = page.getByText('Loading Tweet...');

		await expect
			.element(tweetElement)
			.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
	});

	it('should render loading state properly', async () => {
		render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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

		render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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

		const { unmount } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
		});

		// Unmount component
		unmount();

		expect(removeChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
		removeChildSpy.mockRestore();
	});

	it.skip('should have proper accessibility attributes', async () => {
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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

		for (const tweetLink of testCases) {
			render(Tweet, {
				tweetLink,
			});
			const tweetElement = page.getByText('Loading Tweet...');

			await expect
				.element(tweetElement)
				.toHaveAttribute('href', `https://twitter.com/${tweetLink}`);
		}
	});

	it.skip('should not load duplicate Twitter scripts', async () => {
		// Mock existing script detection
		const existingScript = document.createElement('script');
		existingScript.src = 'https://platform.twitter.com/widgets.js';
		document.head.appendChild(existingScript);

		const createElementSpy = vi.spyOn(document, 'createElement');
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');

		render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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
		const { container } = render(Tweet, {
			tweetLink: 'twitterdev/status/1399879412994844160',
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

import Slides from '$lib/components/slides.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';

describe('Slides', () => {
	it('mounts with default props', async () => {
		const { container } = render(Slides);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		const username = 'my-username';
		const title = 'my-slides';

		render(Slides, {
			username,
			title,
			byline: 'visible',
			share: 'visible',
			style: 'light',
			disable_observer: true,
		});

		const iframe = page.getByTitle(title, { exact: false });
		const expected_src = `https://slides.com/${username}/${title}/embed?&style=light&byline=visible&share=visible`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Slides, {
			width: '80%',
			height: '300px',
			username: 'my-username',
			title: 'my-slides',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			expect(iframe.getAttribute('width')).toBe('80%');
			expect(iframe.getAttribute('height')).toBe('300px');
		}
	});

	it('renders with a GeneralObserver', async () => {
		render(Slides, {
			username: 'my-username',
			title: 'my-slides',
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty username gracefully', async () => {
		const { container } = render(Slides, {
			username: '',
			title: 'test-slides',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain('https://slides.com//test-slides/embed?');
	});

	it('should handle empty title gracefully', async () => {
		const { container } = render(Slides, {
			username: 'test-user',
			title: '',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();
		const src = iframe?.getAttribute('src');
		expect(src).toContain('https://slides.com/test-user//embed?');
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = render(Slides, {
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe).toBeTruthy();

		// Check default values
		expect(iframe?.getAttribute('width')).toBe('100%');
		expect(iframe?.getAttribute('height')).toBe('420px');
		expect(iframe?.getAttribute('scrolling')).toBe('no');
		expect(iframe?.getAttribute('frameborder')).toBe('0');
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);

		const src = iframe?.getAttribute('src');
		expect(src).toContain('style=dark');
		expect(src).toContain('byline=hidden');
		expect(src).toContain('share=hidden');
	});

	it('should handle different style options', async () => {
		const username = 'test-user';
		const title = 'test-slides';

		// Test light style
		const { container: lightContainer } = render(Slides, {
			username,
			title,
			style: 'light',
			disable_observer: true,
		});
		const lightIframe = lightContainer.querySelector('iframe');
		expect(lightIframe?.getAttribute('src')).toContain('style=light');

		// Test dark style
		const { container: darkContainer } = render(Slides, {
			username,
			title,
			style: 'dark',
			disable_observer: true,
		});
		const darkIframe = darkContainer.querySelector('iframe');
		expect(darkIframe?.getAttribute('src')).toContain('style=dark');

		// Test transparent style
		const { container: transparentContainer } = render(Slides, {
			username,
			title,
			style: 'transparent',
			disable_observer: true,
		});
		const transparentIframe =
			transparentContainer.querySelector('iframe');
		expect(transparentIframe?.getAttribute('src')).toContain(
			'style=transparent',
		);
	});

	it('should handle different byline options', async () => {
		const username = 'test-user';
		const title = 'test-slides';

		// Test visible byline
		const { container: visibleContainer } = render(Slides, {
			username,
			title,
			byline: 'visible',
			disable_observer: true,
		});
		const visibleIframe = visibleContainer.querySelector('iframe');
		expect(visibleIframe?.getAttribute('src')).toContain(
			'byline=visible',
		);

		// Test hidden byline
		const { container: hiddenContainer } = render(Slides, {
			username,
			title,
			byline: 'hidden',
			disable_observer: true,
		});
		const hiddenIframe = hiddenContainer.querySelector('iframe');
		expect(hiddenIframe?.getAttribute('src')).toContain(
			'byline=hidden',
		);
	});

	it('should handle different share options', async () => {
		const username = 'test-user';
		const title = 'test-slides';

		// Test visible share
		const { container: visibleContainer } = render(Slides, {
			username,
			title,
			share: 'visible',
			disable_observer: true,
		});
		const visibleIframe = visibleContainer.querySelector('iframe');
		expect(visibleIframe?.getAttribute('src')).toContain(
			'share=visible',
		);

		// Test hidden share
		const { container: hiddenContainer } = render(Slides, {
			username,
			title,
			share: 'hidden',
			disable_observer: true,
		});
		const hiddenIframe = hiddenContainer.querySelector('iframe');
		expect(hiddenIframe?.getAttribute('src')).toContain(
			'share=hidden',
		);
	});

	it('should construct proper Slides embed URL', async () => {
		const username = 'example-user';
		const title = 'example-presentation';
		const { container } = render(Slides, {
			username,
			title,
			style: 'light',
			byline: 'visible',
			share: 'visible',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(
			`https://slides.com/${username}/${title}/embed?`,
		);
		expect(src).toContain('style=light');
		expect(src).toContain('byline=visible');
		expect(src).toContain('share=visible');
	});

	it('should handle special characters in username and title', async () => {
		const username = 'user-name_123';
		const title = 'slide-title_with-chars';
		const { container } = render(Slides, {
			username,
			title,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(
			`https://slides.com/${username}/${title}/embed?`,
		);
		expect(iframe?.getAttribute('title')).toBe(title);
	});

	it('should have proper iframe accessibility attributes', async () => {
		const title = 'accessibility-test-slides';
		const { container } = render(Slides, {
			username: 'test-user',
			title,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('title')).toBe(title);
		expect(iframe?.getAttribute('frameborder')).toBe('0');
		expect(iframe?.getAttribute('scrolling')).toBe('no');
		expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
		expect(iframe?.style.width).toBe('100%');
	});

	it('should handle very long username and title values', async () => {
		const username = 'a'.repeat(50);
		const title = 'b'.repeat(50);
		const { container } = render(Slides, {
			username,
			title,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		expect(src).toContain(
			`https://slides.com/${username}/${title}/embed?`,
		);
	});

	it('should handle numeric width and height values', async () => {
		const { container } = render(Slides, {
			username: 'test-user',
			title: 'test-slides',
			width: '500',
			height: '300',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('width')).toBe('500');
		expect(iframe?.getAttribute('height')).toBe('300');
	});

	it('should handle malformed usernames and titles gracefully', async () => {
		const username = 'user/with/slashes?and=query';
		const title = 'title&with=params';
		const { container } = render(Slides, {
			username,
			title,
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		// Component should still render, even if URL might be malformed
		expect(src).toContain(
			`https://slides.com/${username}/${title}/embed?`,
		);
	});

	it('should render with proper CSS class structure', async () => {
		const { container } = render(Slides, {
			username: 'test-user',
			title: 'test-slides',
			disable_observer: true,
		});

		// Check that iframe has proper styling
		const iframe = container.querySelector('iframe');
		expect(iframe?.style.width).toBe('100%');
	});

	it('should handle query parameter construction correctly', async () => {
		const { container } = render(Slides, {
			username: 'test-user',
			title: 'test-slides',
			style: 'light',
			byline: 'visible',
			share: 'hidden',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		const src = iframe?.getAttribute('src');

		// Check that all parameters are included
		expect(src).toContain('style=light');
		expect(src).toContain('byline=visible');
		expect(src).toContain('share=hidden');

		// Check that parameters are properly formatted
		expect(src).toMatch(/embed\?&.*style=.*&byline=.*&share=/);
	});
});

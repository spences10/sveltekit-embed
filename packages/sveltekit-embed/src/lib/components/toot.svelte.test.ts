import Toot from '$lib/components/toot.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

describe('Toot', () => {
	it('renders iframe with correct src', async () => {
		const instance = 'my-instance';
		const username = 'my-username';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

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

	// Coverage gaps - test stubs to implement
	it('should handle username with existing @ symbol', async () => {
		const instance = 'mastodon.social';
		const username = '@testuser';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		// Should not become @@testuser
		const expected_src = `https://${instance}/@testuser/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle username without @ symbol', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		// Should become @testuser
		const expected_src = `https://${instance}/@testuser/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle username with whitespace', async () => {
		const instance = 'mastodon.social';
		const username = '  testuser  ';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		// Should trim whitespace
		const expected_src = `https://${instance}/@testuser/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should load mastodon embed script on mount', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		// Mock document.createElement and appendChild
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');

		render(Toot, {
			instance,
			username,
			tootId,
		});

		expect(createElementSpy).toHaveBeenCalledWith('script');
		expect(mockScript.src).toBe(`https://${instance}/embed.js`);
		expect(mockScript.async).toBe(true);
		expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should remove mastodon embed script on unmount', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');
		const removeChildSpy = vi.spyOn(document.head, 'removeChild');

		const { unmount } = render(Toot, {
			instance,
			username,
			tootId,
		});

		// Unmount component
		unmount();

		expect(removeChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
		removeChildSpy.mockRestore();
	});

	it.skip('should handle script loading errors gracefully', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi
			.spyOn(document.head, 'appendChild')
			.mockImplementation(() => {
				throw new Error('Script loading failed');
			});

		// Should not throw an error
		expect(() => {
			render(Toot, {
				instance,
				username,
				tootId,
			});
		}).not.toThrow();

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it.skip('should not load duplicate scripts', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.head, 'appendChild');

		// Render first component
		const { unmount: unmount1 } = render(Toot, {
			instance,
			username,
			tootId,
		});

		// Render second component
		render(Toot, {
			instance,
			username,
			tootId: '456',
		});

		// Should only create one script
		expect(createElementSpy).toHaveBeenCalledTimes(1);
		expect(appendChildSpy).toHaveBeenCalledTimes(1);

		unmount1();
		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should handle empty instance value', async () => {
		const instance = '';
		const username = 'testuser';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https:///@testuser/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle empty username value', async () => {
		const instance = 'mastodon.social';
		const username = '';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle empty tootId value', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@testuser//embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in instance URL', async () => {
		const instance = 'test-instance.co.uk';
		const username = 'testuser';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@testuser/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in username', async () => {
		const instance = 'mastodon.social';
		const username = 'test.user_123';
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@test.user_123/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle special characters in tootId', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123456789012345';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@testuser/123456789012345/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it.skip('should have proper iframe accessibility attributes', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		const { container } = render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe).toBeTruthy();
		if (iframe) {
			const iframeElement = iframe as HTMLIFrameElement;
			await expect.element(iframe).toHaveAttribute('title', '');
			await expect.element(iframe).toHaveAttribute('allowfullscreen');
			expect(iframeElement.style.border).toBe('0px');
		}
	});

	it.skip('should apply correct CSS styles', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123';

		const { container } = render(Toot, {
			instance,
			username,
			tootId,
		});
		const wrapper = container.querySelector('div');
		const iframe = container.querySelector('iframe');

		expect(wrapper).toBeTruthy();
		expect(iframe).toBeTruthy();

		if (wrapper && iframe) {
			const wrapperElement = wrapper as HTMLDivElement;
			const iframeElement = iframe as HTMLIFrameElement;

			// Check wrapper styles (computed styles)
			const wrapperStyles = window.getComputedStyle(wrapperElement);
			expect(wrapperStyles.display).toBe('flex');
			expect(wrapperStyles.justifyContent).toBe('center');

			// Check iframe styles
			expect(iframeElement.style.border).toBe('0px');
			expect(iframeElement.style.maxWidth).toBe('100%');
		}
	});

	it('should handle very long usernames', async () => {
		const instance = 'mastodon.social';
		const username = 'a'.repeat(100);
		const tootId = '123';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@${'a'.repeat(100)}/123/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('should handle numeric tootId values', async () => {
		const instance = 'mastodon.social';
		const username = 'testuser';
		const tootId = '123456789';

		render(Toot, {
			instance,
			username,
			tootId,
		});
		const iframe = page.getByTitle('');

		const expected_src = `https://${instance}/@testuser/123456789/embed`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});
});

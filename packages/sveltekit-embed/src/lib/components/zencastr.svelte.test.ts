import Zencastr from '$lib/components/zencastr.svelte';
import { describe, expect, it, vi } from 'vitest';
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
				'https://zencastr.com/embed/abc123',
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
				'https://zencastr.com/embed/abc123',
			);
		}
	});

	// Coverage gaps - test stubs to implement
	it('should handle empty zencastrId gracefully', async () => {
		const { container } = render(Zencastr, {
			zencastrId: '',
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		expect(player).toBeTruthy();
		expect(link).toBeTruthy();

		if (player && link) {
			expect(player.getAttribute('data-episode-href')).toBe(
				'https://zencastr.com/embed/',
			);
			expect(link.getAttribute('href')).toBe(
				'https://zencastr.com/embed/',
			);
		}
	});

	it('should apply default prop values when not provided', async () => {
		const { container } = render(Zencastr, {
			// zencastrId not provided - should use default empty string
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		expect(player).toBeTruthy();
		expect(link).toBeTruthy();

		if (player && link) {
			expect(player.getAttribute('data-episode-href')).toBe(
				'https://zencastr.com/embed/',
			);
			expect(link.getAttribute('href')).toBe(
				'https://zencastr.com/embed/',
			);
		}
	});

	it('should construct proper Zencastr embed URL', async () => {
		const zencastrId = 'test-episode-123';
		const { container } = render(Zencastr, {
			zencastrId,
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		expect(player).toBeTruthy();
		expect(link).toBeTruthy();

		if (player && link) {
			const expectedUrl = `https://zencastr.com/embed/${zencastrId}`;
			expect(player.getAttribute('data-episode-href')).toBe(
				expectedUrl,
			);
			expect(link.getAttribute('href')).toBe(expectedUrl);
		}
	});

	it('should handle special characters in zencastrId', async () => {
		const zencastrId = 'test-episode_123.special';
		const { container } = render(Zencastr, {
			zencastrId,
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		if (player && link) {
			const expectedUrl = `https://zencastr.com/embed/${zencastrId}`;
			expect(player.getAttribute('data-episode-href')).toBe(
				expectedUrl,
			);
			expect(link.getAttribute('href')).toBe(expectedUrl);
		}
	});

	it('should have proper blockquote structure and attributes', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const blockquote = container.querySelector('blockquote');
		expect(blockquote).toBeTruthy();

		if (blockquote) {
			const blockquoteElement = blockquote as HTMLElement;
			expect(blockquoteElement.classList.contains('zenplayer')).toBe(
				true,
			);
			expect(
				blockquoteElement.getAttribute('data-episode-href'),
			).toBe('https://zencastr.com/embed/abc123');

			// Check style attributes
			const style = blockquoteElement.getAttribute('style');
			expect(style).toContain('background: black');
			expect(style).toContain('border-radius: 12px');
			expect(style).toContain('width: 480px');
			expect(style).toContain('height: 480px');
			expect(style).toContain('position: relative');
			expect(style).toContain('color: white');
			expect(style).toContain('margin: 0');
		}
	});

	it('should handle very long zencastrId values', async () => {
		const zencastrId = 'a'.repeat(100);
		const { container } = render(Zencastr, {
			zencastrId,
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		if (player && link) {
			const expectedUrl = `https://zencastr.com/embed/${zencastrId}`;
			expect(player.getAttribute('data-episode-href')).toBe(
				expectedUrl,
			);
			expect(link.getAttribute('href')).toBe(expectedUrl);
		}
	});

	it('should render proper link text and structure', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const link = container.querySelector('a');
		expect(link).toBeTruthy();

		if (link) {
			const linkElement = link as HTMLAnchorElement;
			expect(linkElement.textContent).toBe('View on Zencastr');
			expect(linkElement.getAttribute('target')).toBe('_blank');
			expect(linkElement.getAttribute('rel')).toBe(
				'noopener noreferrer',
			);

			// Check link styles
			const style = linkElement.getAttribute('style');
			expect(style).toContain('color: white');
			expect(style).toContain('position: absolute');
			expect(style).toContain('bottom: 12px');
			expect(style).toContain('left: 50%');
			expect(style).toContain('transform: translateX(-50%)');
			expect(style).toContain('text-decoration: none');
		}
	});

	it('should handle malformed zencastr IDs gracefully', async () => {
		const zencastrId = 'invalid/id/with/slashes';
		const { container } = render(Zencastr, {
			zencastrId,
		});

		const player = container.querySelector('blockquote');
		const link = container.querySelector('a');

		if (player && link) {
			const expectedUrl = `https://zencastr.com/embed/${zencastrId}`;
			expect(player.getAttribute('data-episode-href')).toBe(
				expectedUrl,
			);
			expect(link.getAttribute('href')).toBe(expectedUrl);
		}
	});

	it('should load Zencastr player script correctly', async () => {
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.body, 'appendChild');

		render(Zencastr, {
			zencastrId: 'abc123',
		});

		expect(createElementSpy).toHaveBeenCalledWith('script');
		expect(mockScript.src).toBe(
			'https://zencastr.com/static/js/embed-player.js',
		);
		expect(mockScript.async).toBe(true);
		expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should handle component unmount and cleanup', async () => {
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.body, 'appendChild');

		const { unmount } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		// Verify script was added
		expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

		// Unmount component - script should remain (no cleanup in onMount)
		unmount();

		// Zencastr component doesn't implement cleanup, so script remains
		expect(mockScript.parentNode).toBe(document.body);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should have proper accessibility attributes', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const img = container.querySelector('img');
		const link = container.querySelector('a');

		expect(img).toBeTruthy();
		expect(link).toBeTruthy();

		if (img && link) {
			const imgElement = img as HTMLImageElement;
			const linkElement = link as HTMLAnchorElement;

			// Check img accessibility
			expect(imgElement.getAttribute('alt')).toBe('');

			// Check link accessibility
			expect(linkElement.getAttribute('target')).toBe('_blank');
			expect(linkElement.getAttribute('rel')).toBe(
				'noopener noreferrer',
			);
		}
	});

	it('should handle Zencastr player initialization', async () => {
		const mockScript = document.createElement('script');
		const createElementSpy = vi
			.spyOn(document, 'createElement')
			.mockReturnValue(mockScript);
		const appendChildSpy = vi.spyOn(document.body, 'appendChild');

		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		// Verify the player container is ready for initialization
		const blockquote = container.querySelector(
			'blockquote.zenplayer',
		);
		expect(blockquote).toBeTruthy();

		// Verify script loading was initiated
		expect(createElementSpy).toHaveBeenCalledWith('script');
		expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

		createElementSpy.mockRestore();
		appendChildSpy.mockRestore();
	});

	it('should render with proper section wrapper and centering', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const section = container.querySelector('section');
		expect(section).toBeTruthy();

		if (section) {
			const sectionElement = section as HTMLElement;
			const style = sectionElement.getAttribute('style');
			expect(style).toContain('display:flex');
			expect(style).toContain('justify-content: center');
		}
	});

	it('should handle img element structure correctly', async () => {
		const { container } = render(Zencastr, {
			zencastrId: 'abc123',
		});

		const img = container.querySelector('img');
		expect(img).toBeTruthy();

		if (img) {
			const imgElement = img as HTMLImageElement;
			expect(imgElement.getAttribute('alt')).toBe('');

			const style = imgElement.getAttribute('style');
			expect(style).toContain('width: 120px');
			expect(style).toContain('display: inline-block');
			expect(style).toContain('position: absolute');
			expect(style).toContain('top: calc(50%)');
			expect(style).toContain('left: calc(50%)');
			expect(style).toContain('transform: translate(-50%, -50%)');
		}
	});
});

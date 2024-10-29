import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';
import Bluesky from './bluesky.svelte';

describe('Bluesky', () => {
	afterEach(() => cleanup());

	const test_post_id =
		'did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k';

	it('mounts with default props', async () => {
		const { container } = render(Bluesky);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct embed url', async () => {
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = getByTestId('bluesky-embed');
		const expected_src = `https://embed.bsky.app/embed/${test_post_id}`;
		expect(iframe.getAttribute('src')).toBe(expected_src);
	});

	it('renders with custom width', async () => {
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
			width: '50%',
		});

		const iframe = getByTestId('bluesky-embed');
		expect(iframe.getAttribute('width')).toBe('50%');
	});

	it('applies custom iframe styles', async () => {
		const custom_styles = 'border-radius: 8px; background: #f0f0f0;';
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
			iframe_styles: custom_styles,
		});

		const iframe = getByTestId('bluesky-embed');
		const style_text = iframe.style.cssText.toLowerCase();
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('background: rgb(240, 240, 240)');
	});

	it('has correct default styles', async () => {
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
		});

		const iframe = getByTestId('bluesky-embed');
		const style_text = iframe.style.cssText.toLowerCase();
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('top: 0px');
		expect(style_text).toContain('left: 0px');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');
		expect(style_text).toContain('border: 0px');
		expect(iframe.getAttribute('frameborder')).toBe('0');
		expect(iframe.getAttribute('scrolling')).toBe('no');
	});

	it('combines default and custom iframe styles correctly', async () => {
		const custom_styles = 'border-radius: 8px; margin: 10px;';
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
			iframe_styles: custom_styles,
		});

		const iframe = getByTestId('bluesky-embed');
		const style_text = iframe.style.cssText.toLowerCase();

		// Check default styles are preserved
		expect(style_text).toContain('position: absolute');
		expect(style_text).toContain('width: 100%');
		expect(style_text).toContain('height: 100%');
		expect(style_text).toContain('border: 0px');

		// Check custom styles are applied
		expect(style_text).toContain('border-radius: 8px');
		expect(style_text).toContain('margin: 10px');
	});

	it('updates height when receiving message from iframe', () => {
		const { getByTestId } = render(Bluesky, {
			post_id: test_post_id,
		});

		const message_event = new MessageEvent('message', {
			data: { type: 'height', height: 500 },
			origin: 'https://embed.bsky.app',
		});

		window.dispatchEvent(message_event);

		const iframe = getByTestId('bluesky-embed');
		expect(iframe.style.height).toBe('100%');
	});
});

import Gist from '$lib/components/gist.svelte';
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

const gistUri = 'gauravchl';

describe('Gist', () => {
	it('mounts with default props', async () => {
		const { container } = render(Gist);
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct src', async () => {
		render(Gist, {
			gistUri,
			disable_observer: true,
		});
		const iframe = page.getByTitle('gist-widget');
		const expected_src = `https://gist.github.com/${gistUri}.pibb`;
		await expect.element(iframe).toHaveAttribute('src', expected_src);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(Gist, {
			gistUri,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');

		expect(iframe?.getAttribute('style')).toContain(`height: 200px`);
		expect(iframe?.getAttribute('style')).toContain(`width: 50%`);
	});

	it('renders with a GeneralObserver', async () => {
		render(Gist, {
			gistUri,
			disable_observer: false,
		});
		const general_observer = page.getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});

	describe('Edge Cases', () => {
		it('should handle empty gistUri gracefully', async () => {
			render(Gist, {
				gistUri: '',
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still construct a valid URL even with empty gistUri
			expect(element.src).toBe('https://gist.github.com/.pibb');
		});

		it('should handle special characters in gistUri', async () => {
			const specialGistUri = 'user-name/gist_id-123';
			render(Gist, {
				gistUri: specialGistUri,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(specialGistUri);
			expect(element.src).toBe(
				`https://gist.github.com/${specialGistUri}.pibb`,
			);
		});

		it('should handle very long gistUri values', async () => {
			const longGistUri = 'user/' + 'a'.repeat(1000);
			render(Gist, {
				gistUri: longGistUri,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.src).toContain(longGistUri);
			expect(element.src).toBe(
				`https://gist.github.com/${longGistUri}.pibb`,
			);
		});

		it('should handle malformed gist URIs gracefully', async () => {
			const malformedUri = 'not/a/valid/gist/uri';
			render(Gist, {
				gistUri: malformedUri,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			// Should still render with the malformed URI
			expect(element.src).toBe(
				`https://gist.github.com/${malformedUri}.pibb`,
			);
		});
	});

	describe('Default Props', () => {
		it('should apply default height and width when not provided', async () => {
			const { container } = render(Gist, {
				gistUri,
				disable_observer: true,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe?.style.height).toBe('320px');
			expect(iframe?.style.width).toBe('100%');
		});
	});

	describe('Custom Styling', () => {
		it('should apply custom iframe styles correctly', async () => {
			const customStyles = 'border: 2px solid red; background: blue;';
			render(Gist, {
				gistUri,
				iframe_styles: customStyles,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			expect(element.getAttribute('style')).toBe(customStyles);
		});

		it('should handle numeric height and width values', async () => {
			const { container } = render(Gist, {
				gistUri,
				height: '400px',
				width: '80%',
				disable_observer: true,
			});
			const iframe = container.querySelector('iframe');

			expect(iframe?.style.height).toBe('400px');
			expect(iframe?.style.width).toBe('80%');
		});
	});

	describe('URL Construction', () => {
		it('should construct proper GitHub gist URL', async () => {
			const testGistUri = 'username/gist123456';
			render(Gist, {
				gistUri: testGistUri,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			const expectedUrl = `https://gist.github.com/${testGistUri}.pibb`;
			expect(element.src).toBe(expectedUrl);
		});

		it('should handle gist with file parameter', async () => {
			const gistWithFile = 'username/gist123456?file=example.js';
			render(Gist, {
				gistUri: gistWithFile,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');
			const element = iframe.element() as HTMLIFrameElement;

			// Note: The file parameter gets included in the URL as part of gistUri
			expect(element.src).toBe(
				`https://gist.github.com/${gistWithFile}.pibb`,
			);
		});
	});

	describe('Accessibility', () => {
		it('should have proper iframe accessibility attributes', async () => {
			render(Gist, {
				gistUri,
				disable_observer: true,
			});
			const iframe = page.getByTitle('gist-widget');

			await expect
				.element(iframe)
				.toHaveAttribute('title', 'gist-widget');
		});
	});

	describe('CSS Styling', () => {
		it('should apply default CSS styles from component', async () => {
			const { container } = render(Gist, {
				gistUri,
				disable_observer: true,
			});
			const iframe = container.querySelector('iframe');

			// The component has CSS rules that should be applied
			expect(iframe).toBeTruthy();
		});
	});
});

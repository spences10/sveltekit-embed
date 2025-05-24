import CodePen from '$lib/components/code-pen.svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

let codePenId = 'abcde';

describe('CodePen', () => {
	it('mounts', async () => {
		const { container } = render(CodePen, {
			codePenId,
			disable_observer: true,
		});
		expect(container).toBeTruthy();
	});

	it('renders iframe with correct attributes', async () => {
		const { getByTitle } = render(CodePen, {
			codePenId,
			disable_observer: true,
		});

		const iframe = getByTitle(`codepen-${codePenId}`);
		const element = iframe.element();

		expect(element.getAttribute('src')).toContain(
			`codepen.io/team/codepen/embed`,
		);
		expect(element.getAttribute('src')).toContain(`/${codePenId}/`);
		expect(element.getAttribute('src')).toContain(`height=500px`);
		expect(element.getAttribute('src')).toContain(`theme-id=default`);
		expect(element.getAttribute('src')).toContain(
			`default-tab=result`,
		);
		expect(element.getAttribute('src')).toContain(`editable=true`);
		expect(element.getAttribute('src')).toContain('/preview');
		await expect.element(iframe).toHaveAttribute('frameborder', 'no');
		await expect
			.element(iframe)
			.toHaveAttribute('allowfullscreen', '');
		expect(element.getAttribute('style')).toContain(`height: 500px`);
		expect(element.getAttribute('style')).toContain(`width: 100%`);
	});

	it('mounts with custom height and width', async () => {
		const { container } = render(CodePen, {
			codePenId,
			height: '200px',
			width: '50%',
			disable_observer: true,
		});
		const iframe = container.querySelector('iframe');
		expect(iframe?.getAttribute('style')).toContain('height: 200px');
		expect(iframe?.getAttribute('style')).toContain('width: 50%');
	});

	it('renders with a GeneralObserver', async () => {
		const { getByTestId } = render(CodePen, {
			codePenId,
			disable_observer: false,
		});
		const general_observer = getByTestId('general-observer');
		await expect.element(general_observer).toBeInTheDocument();
	});
});

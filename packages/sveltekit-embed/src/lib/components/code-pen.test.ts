import CodePen from '$lib/components/code-pen.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

let codePenId = 'abcde';

describe('CodePen', () => {
	afterEach(() => cleanup());

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

		expect(iframe.getAttribute('src')).toContain(
			`codepen.io/team/codepen/embed`,
		);
		expect(iframe.getAttribute('src')).toContain(`/${codePenId}/`);
		expect(iframe.getAttribute('src')).toContain(`height=500px`);
		expect(iframe.getAttribute('src')).toContain(`theme-id=default`);
		expect(iframe.getAttribute('src')).toContain(
			`default-tab=result`,
		);
		expect(iframe.getAttribute('src')).toContain(`editable=true`);
		expect(iframe.getAttribute('src')).toContain('/preview');
		expect(iframe.getAttribute('frameborder')).toBe('no');
		expect(iframe.getAttribute('allowfullscreen')).toBe('');
		expect(iframe.getAttribute('style')).toContain(`height: 500px`);
		expect(iframe.getAttribute('style')).toContain(`width: 100%`);
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
		expect(general_observer).toBeTruthy();
	});
});

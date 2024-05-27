import GeneralObserver from '$lib/components/general-observer.svelte';
import { cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('General Observer', () => {
	afterEach(() => cleanup());

	it('mounts', () => {
		const { container } = render(GeneralObserver);
		expect(container).toBeTruthy();
	});
});

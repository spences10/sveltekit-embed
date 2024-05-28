import { cleanup, render } from '@testing-library/svelte/svelte5';
import { afterEach, describe, expect, it } from 'vitest';

import GeneralObserver from './general-observer.svelte';

describe('General Observer', () => {
	afterEach(() => cleanup());

	it('mounts', () => {
		const { container } = render(GeneralObserver);
		expect(container).toBeTruthy();
	});
});

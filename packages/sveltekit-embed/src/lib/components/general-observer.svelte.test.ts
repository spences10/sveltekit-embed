import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

import GeneralObserver from './general-observer.svelte';

describe('General Observer', () => {
	it('mounts', async () => {
		const { container } = render(GeneralObserver);
		expect(container).toBeTruthy();
	});
});

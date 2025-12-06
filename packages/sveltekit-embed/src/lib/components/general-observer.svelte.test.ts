import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import GeneralObserver from './general-observer.svelte';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let lastObserverInstance: MockIntersectionObserver | null = null;
let lastObserverCallback: IntersectionObserverCallback | null = null;
let lastObserverOptions: IntersectionObserverInit | undefined =
	undefined;

class MockIntersectionObserver {
	constructor(
		public callback: IntersectionObserverCallback,
		public options?: IntersectionObserverInit,
	) {
		lastObserverInstance = this;
		lastObserverCallback = callback;
		lastObserverOptions = options;
	}
	observe = mockObserve;
	disconnect = mockDisconnect;
	unobserve = vi.fn();
	takeRecords = vi.fn(() => []);
	root = null;
	rootMargin = '0px';
	thresholds = [0];
}

beforeEach(() => {
	lastObserverInstance = null;
	lastObserverCallback = null;
	lastObserverOptions = undefined;
	vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
	vi.clearAllMocks();
	vi.unstubAllGlobals();
});

describe('General Observer', () => {
	it('mounts', async () => {
		const { container } = render(GeneralObserver, {
			disable_observer: true,
			children: (() => 'Test content') as any,
		});
		expect(container).toBeTruthy();
	});

	describe('Observer Disabled', () => {
		it.skip('should render children when disable_observer is true', async () => {
			const testContent = 'Test content for disabled observer';
			render(GeneralObserver, {
				disable_observer: true,
				children: (() => testContent) as any,
			});

			const content = page.getByText(testContent);
			await expect.element(content).toBeInTheDocument();
		});
	});

	describe('Observer Enabled', () => {
		it('should not render children initially when observer is enabled', async () => {
			const testContent = 'Test content for enabled observer';
			const { container } = render(GeneralObserver, {
				disable_observer: false,
				children: (() => testContent) as any,
			});

			// Content should not be visible initially
			expect(container.textContent).not.toContain(testContent);
		});

		it('should create IntersectionObserver when supported and enabled', async () => {
			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			expect(lastObserverCallback).toBeTypeOf('function');
			expect(lastObserverOptions).toEqual({
				rootMargin: '0px',
				threshold: 0.5,
			});
		});

		it('should observe root element when observer is created', async () => {
			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			const rootElement = page.getByTestId('general-observer');

			expect(mockObserve).toHaveBeenCalledWith(rootElement.element());
		});

		it('should handle custom threshold values', async () => {
			const customThreshold = 0.8;
			render(GeneralObserver, {
				disable_observer: false,
				threshold: customThreshold,
				children: (() => 'Test content') as any,
			});

			expect(lastObserverOptions).toEqual({
				rootMargin: '0px',
				threshold: customThreshold,
			});
		});

		it('should handle threshold edge cases (0, 1)', async () => {
			const thresholds = [0, 1];

			for (const threshold of thresholds) {
				render(GeneralObserver, {
					disable_observer: false,
					threshold,
					children: (() => 'Test content') as any,
				});

				expect(lastObserverOptions).toEqual({
					rootMargin: '0px',
					threshold,
				});
			}
		});
	});

	describe('IntersectionObserver Behavior', () => {
		it.skip('should render children when intersection threshold is met', async () => {
			const testContent = 'Content to show after intersection';
			const { container } = render(GeneralObserver, {
				disable_observer: false,
				threshold: 0.5,
				children: (() => testContent) as any,
			});

			// Initially, content should not be visible
			expect(container.textContent).not.toContain(testContent);

			// Simulate intersection using captured callback
			lastObserverCallback?.(
				[{ intersectionRatio: 0.6 }] as IntersectionObserverEntry[],
				lastObserverInstance as unknown as IntersectionObserver,
			);

			// Wait for reactivity
			await new Promise(resolve => setTimeout(resolve, 10));

			// Content should now be visible
			expect(container.textContent).toContain(testContent);
		});

		it('should disconnect observer after successful intersection', async () => {
			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			// Simulate intersection using the captured callback
			lastObserverCallback?.(
				[{ intersectionRatio: 0.6 }] as IntersectionObserverEntry[],
				lastObserverInstance as unknown as IntersectionObserver,
			);

			expect(mockDisconnect).toHaveBeenCalled();
		});

		it.skip('should handle multiple intersection entries correctly', async () => {
			const testContent = 'Multiple entries test';
			const { container } = render(GeneralObserver, {
				disable_observer: false,
				threshold: 0.5,
				children: (() => testContent) as any,
			});

			// Simulate multiple entries where one meets threshold
			lastObserverCallback?.(
				[
					{ intersectionRatio: 0.3 }, // Below threshold
					{ intersectionRatio: 0.7 }, // Above threshold
					{ intersectionRatio: 0.1 }, // Below threshold
				] as IntersectionObserverEntry[],
				lastObserverInstance as unknown as IntersectionObserver,
			);

			await new Promise(resolve => setTimeout(resolve, 10));

			// Content should be visible because one entry met threshold
			expect(container.textContent).toContain(testContent);
		});
	});

	describe('IntersectionObserver Not Supported', () => {
		it('should handle IntersectionObserver not supported gracefully', async () => {
			vi.stubGlobal('IntersectionObserver', undefined);

			const { container } = render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Fallback content') as any,
			});

			// Should not crash and not show content
			expect(container.textContent).not.toContain('Fallback content');
		});
	});

	describe('Component Lifecycle', () => {
		it('should cleanup observer on component unmount', async () => {
			const { unmount } = render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			unmount();

			expect(mockDisconnect).toHaveBeenCalled();
		});
	});

	describe('Edge Cases', () => {
		it('should handle missing children gracefully', async () => {
			const { container } = render(GeneralObserver, {
				disable_observer: true,
				children: undefined as any,
			});

			// Should not crash
			expect(container).toBeTruthy();
		});

		it('should maintain proper data-testid on root element', async () => {
			render(GeneralObserver, {
				disable_observer: true,
				children: (() => 'Test content') as any,
			});

			const rootElement = page.getByTestId('general-observer');
			await expect.element(rootElement).toBeInTheDocument();
		});
	});

	describe('Configuration', () => {
		it('should respect rootMargin configuration', async () => {
			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			expect(lastObserverOptions).toEqual({
				rootMargin: '0px',
				threshold: 0.5,
			});
		});
	});
});

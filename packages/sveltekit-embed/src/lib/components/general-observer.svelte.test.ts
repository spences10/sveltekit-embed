import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import { render } from 'vitest-browser-svelte';

import GeneralObserver from './general-observer.svelte';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
	mockIntersectionObserver.mockReturnValue({
		observe: mockObserve,
		disconnect: mockDisconnect,
	});
	vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
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
			const { getByText } = render(GeneralObserver, {
				disable_observer: true,
				children: (() => testContent) as any,
			});

			const content = getByText(testContent);
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

			expect(mockIntersectionObserver).toHaveBeenCalledWith(
				expect.any(Function),
				{
					rootMargin: '0px',
					threshold: 0.5,
				},
			);
		});

		it('should observe root element when observer is created', async () => {
			const { getByTestId } = render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			const rootElement = getByTestId('general-observer');

			expect(mockObserve).toHaveBeenCalledWith(rootElement.element());
		});

		it('should handle custom threshold values', async () => {
			const customThreshold = 0.8;
			render(GeneralObserver, {
				disable_observer: false,
				threshold: customThreshold,
				children: (() => 'Test content') as any,
			});

			expect(mockIntersectionObserver).toHaveBeenCalledWith(
				expect.any(Function),
				{
					rootMargin: '0px',
					threshold: customThreshold,
				},
			);
		});

		it('should handle threshold edge cases (0, 1)', async () => {
			const thresholds = [0, 1];

			for (const threshold of thresholds) {
				render(GeneralObserver, {
					disable_observer: false,
					threshold,
					children: (() => 'Test content') as any,
				});

				expect(mockIntersectionObserver).toHaveBeenCalledWith(
					expect.any(Function),
					{
						rootMargin: '0px',
						threshold,
					},
				);
			}
		});
	});

	describe('IntersectionObserver Behavior', () => {
		it.skip('should render children when intersection threshold is met', async () => {
			let intersectionCallback:
				| ((entries: any[]) => void)
				| undefined;

			mockIntersectionObserver.mockImplementation(
				(callback, options) => {
					intersectionCallback = callback;
					return {
						observe: mockObserve,
						disconnect: mockDisconnect,
					};
				},
			);

			const testContent = 'Content to show after intersection';
			const { container } = render(GeneralObserver, {
				disable_observer: false,
				threshold: 0.5,
				children: (() => testContent) as any,
			});

			// Initially, content should not be visible
			expect(container.textContent).not.toContain(testContent);

			// Simulate intersection
			intersectionCallback?.([
				{
					intersectionRatio: 0.6, // Above threshold
				},
			]);

			// Wait for reactivity
			await new Promise(resolve => setTimeout(resolve, 10));

			// Content should now be visible
			expect(container.textContent).toContain(testContent);
		});

		it('should disconnect observer after successful intersection', async () => {
			let intersectionCallback:
				| ((entries: any[]) => void)
				| undefined;

			mockIntersectionObserver.mockImplementation(
				(callback, options) => {
					intersectionCallback = callback;
					return {
						observe: mockObserve,
						disconnect: mockDisconnect,
					};
				},
			);

			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			// Simulate intersection
			intersectionCallback?.([
				{
					intersectionRatio: 0.6,
				},
			]);

			expect(mockDisconnect).toHaveBeenCalled();
		});

		it.skip('should handle multiple intersection entries correctly', async () => {
			let intersectionCallback:
				| ((entries: any[]) => void)
				| undefined;

			mockIntersectionObserver.mockImplementation(
				(callback, options) => {
					intersectionCallback = callback;
					return {
						observe: mockObserve,
						disconnect: mockDisconnect,
					};
				},
			);

			const testContent = 'Multiple entries test';
			const { container } = render(GeneralObserver, {
				disable_observer: false,
				threshold: 0.5,
				children: (() => testContent) as any,
			});

			// Simulate multiple entries where one meets threshold
			intersectionCallback?.([
				{ intersectionRatio: 0.3 }, // Below threshold
				{ intersectionRatio: 0.7 }, // Above threshold
				{ intersectionRatio: 0.1 }, // Below threshold
			]);

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
			const { getByTestId } = render(GeneralObserver, {
				disable_observer: true,
				children: (() => 'Test content') as any,
			});

			const rootElement = getByTestId('general-observer');
			await expect.element(rootElement).toBeInTheDocument();
		});
	});

	describe('Configuration', () => {
		it('should respect rootMargin configuration', async () => {
			render(GeneralObserver, {
				disable_observer: false,
				children: (() => 'Test content') as any,
			});

			expect(mockIntersectionObserver).toHaveBeenCalledWith(
				expect.any(Function),
				{
					rootMargin: '0px',
					threshold: 0.5,
				},
			);
		});
	});
});

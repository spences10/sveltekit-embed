import type { Attachment } from 'svelte/attachments';

export interface InViewOptions {
	/** Called when the element enters the viewport. */
	on_enter: (entry: IntersectionObserverEntry) => void;
	/** Called when the element leaves the viewport. */
	on_leave?: (entry: IntersectionObserverEntry) => void;
	/** How much of the element must be visible, from 0 to 1. */
	threshold?: number;
	/** Margin around the viewport, as a CSS margin string. */
	root_margin?: string;
	/** Stop observing after the first `on_enter`. */
	once?: boolean;
}

/**
 * Attachment that reports when an element enters the viewport.
 *
 * ```svelte
 * <div {@attach in_view({ on_enter: () => (visible = true) })}>
 * ```
 */
export const in_view = (
	options: InViewOptions,
): Attachment<Element> => {
	return (node) => {
		const {
			on_enter,
			on_leave,
			threshold = 0,
			root_margin = '0px',
			once = true,
		} = options;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (
						entry.isIntersecting &&
						entry.intersectionRatio >= threshold
					) {
						on_enter(entry);
						if (once) observer.disconnect();
					} else {
						on_leave?.(entry);
					}
				}
			},
			{ rootMargin: root_margin, threshold },
		);

		observer.observe(node);

		return () => observer.disconnect();
	};
};

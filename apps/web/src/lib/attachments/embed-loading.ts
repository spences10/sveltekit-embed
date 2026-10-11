import type { Attachment } from 'svelte/attachments';

/** How long to wait for a script based embed to add its iframe */
const give_up_after = 8000;

/** True once the iframe has left the blank page it starts on. Reading
 * the location of another origin throws, which is the answer. */
function has_navigated(iframe: HTMLIFrameElement) {
	try {
		return iframe.contentWindow?.location.href !== 'about:blank';
	} catch {
		return true;
	}
}

/**
 * Sets `data-embed-loading` on an element until the embeds inside it
 * have loaded, for app.css to show a spinner. Lazy iframes only start
 * loading near the viewport and some embeds are slow after that, so
 * without it a stage can sit empty with nothing to say why.
 */
export const embed_loading: Attachment<HTMLElement> = (node) => {
	// The src each iframe finished loading, a new src means a new wait
	const loaded = new WeakMap<HTMLIFrameElement, string>();
	let gave_up = false;

	// Server rendered iframes can be done before this runs, and their
	// load event with them
	for (const iframe of node.querySelectorAll('iframe')) {
		if (has_navigated(iframe)) loaded.set(iframe, iframe.src);
	}

	function update() {
		const iframes = [...node.querySelectorAll('iframe')];
		// Tweet and Zencastr have no iframe until their script adds one
		const loading = iframes.length
			? iframes.some((iframe) => loaded.get(iframe) !== iframe.src)
			: !gave_up;

		if (loading) node.dataset.embedLoading = '';
		else delete node.dataset.embedLoading;
	}

	function handle_load(event: Event) {
		if (event.target instanceof HTMLIFrameElement) {
			loaded.set(event.target, event.target.src);
			update();
		}
	}

	// load doesn't bubble, capturing sees it from every iframe inside
	node.addEventListener('load', handle_load, true);

	const observer = new MutationObserver(update);
	observer.observe(node, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: ['src'],
	});

	const give_up_timer = setTimeout(() => {
		gave_up = true;
		update();
	}, give_up_after);

	update();

	return () => {
		node.removeEventListener('load', handle_load, true);
		observer.disconnect();
		clearTimeout(give_up_timer);
		delete node.dataset.embedLoading;
	};
};

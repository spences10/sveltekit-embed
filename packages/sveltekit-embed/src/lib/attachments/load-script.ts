import type { Attachment } from 'svelte/attachments';

export interface LoadScriptOptions {
	/** Where to append the script. */
	parent?: 'head' | 'body';
	/** Called once the script has loaded. */
	on_load?: () => void;
}

/**
 * Attachment that loads a script for as long as the element exists.
 * Each attached element appends its own script, so embed scripts that
 * scan the page when they run pick up elements mounted later.
 */
export const load_script = (
	src: string,
	options: LoadScriptOptions = {},
): Attachment<Element> => {
	return () => {
		const { parent = 'head', on_load } = options;

		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		if (on_load) script.addEventListener('load', on_load);
		document[parent].appendChild(script);

		return () => script.remove();
	};
};

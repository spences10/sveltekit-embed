export type ThemeMode = 'light' | 'dark' | 'system';

const storage_key = 'theme';

/** `system` until the visitor picks one. app.html applies the stored
 * choice before first paint, this keeps the UI in step with it. */
export const theme = $state<{ mode: ThemeMode }>({ mode: 'system' });

export function read_stored_mode() {
	const stored = localStorage.getItem(storage_key);
	theme.mode =
		stored === 'light' || stored === 'dark' ? stored : 'system';
}

export function set_mode(mode: ThemeMode) {
	theme.mode = mode;
	if (mode === 'system') {
		localStorage.removeItem(storage_key);
		delete document.documentElement.dataset.theme;
	} else {
		localStorage.setItem(storage_key, mode);
		document.documentElement.dataset.theme = mode;
	}
}

/** What's on screen right now, resolving `system` */
export function is_dark() {
	if (theme.mode !== 'system') return theme.mode === 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

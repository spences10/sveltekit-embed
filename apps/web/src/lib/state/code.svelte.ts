const storage_key = 'line-numbers';

/** One switch for every code block on the site, off until asked for */
export const code = $state({ line_numbers: false });

export function read_stored_code() {
	code.line_numbers = localStorage.getItem(storage_key) === 'on';
}

export function toggle_line_numbers() {
	code.line_numbers = !code.line_numbers;
	localStorage.setItem(storage_key, code.line_numbers ? 'on' : 'off');
}

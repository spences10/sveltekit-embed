import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform }) => {
	const is_cloudflare = platform?.env?.CF_PAGES === '1';

	return {
		is_cloudflare,
	};
};

export const load = async ({ platform }) => {
	const is_cloudflare = platform?.env?.CF_PAGES === '1';

	return {
		is_cloudflare,
	};
};

export const load = async ({ platform }) => {
	const isVercel = platform?.env?.VERCEL === '1';
	const isCloudflare = platform?.env?.CF_PAGES === '1';

	return {
		isVercel,
		isCloudflare,
	};
};

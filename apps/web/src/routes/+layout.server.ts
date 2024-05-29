export const load = ({ platform }) => {
	const isVercel = platform?.env?.VERCEL === '1';

  console.log('=====================')
  console.log(platform)
  console.log('=====================')

	return {
		isVercel,
	};
};

/**
 * Turn a `16:9` style ratio into a CSS `aspect-ratio` declaration.
 * Falls back to 16:9 when the ratio can't be read.
 */
export const get_aspect_ratio = (aspect_ratio: string) => {
	const [width, height] = aspect_ratio.split(':').map(Number);
	if (!(width > 0) || !(height > 0)) return 'aspect-ratio: 16 / 9;';
	return `aspect-ratio: ${width} / ${height};`;
};

export const site = {
	name: 'SvelteKit Embed',
	package: 'sveltekit-embed',
	url: 'https://sveltekit-embed.pages.dev',
	description:
		'Svelte components for embedding third party media in your SvelteKit projects: YouTube, Spotify, Bluesky, CodePen and more.',
	repo: 'https://github.com/spences10/sveltekit-embed',
	npm: 'https://www.npmjs.com/package/sveltekit-embed',
	// Made by `pnpm run share-cards`, one per page in static/og
	share_card: { width: 1200, height: 630 },
	discussions:
		'https://github.com/spences10/sveltekit-embed/discussions',
};

/** The link-preview card for a page, named as in static/og */
export const share_card_url = (name: string) =>
	`${site.url}/og/${name}.png`;

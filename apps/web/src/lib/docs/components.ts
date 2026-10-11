export interface PropDoc {
	name: string;
	type: string;
	/** As written in source. Leave out for required props and props
	 * with no default. */
	default?: string;
	required?: boolean;
	description: string;
}

export interface ComponentDoc {
	/** The export name, e.g. `YouTube` */
	name: string;
	category: CategoryId;
	/** One line, shown in the index, the palette and the page header */
	description: string;
	/** Extra search terms that aren't in the name or description */
	keywords: string[];
	props: PropDoc[];
}

export const categories = [
	{ id: 'video', label: 'Video' },
	{ id: 'audio', label: 'Audio and podcasts' },
	{ id: 'social', label: 'Social posts' },
	{ id: 'code', label: 'Code' },
	{ id: 'more', label: 'Everything else' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

const loading: PropDoc = {
	name: 'loading',
	type: `'lazy' | 'eager'`,
	default: `'lazy'`,
	description:
		'`lazy` waits until the embed is near the viewport, `eager` loads it straight away.',
};

const width = (value = `'100%'`): PropDoc => ({
	name: 'width',
	type: 'string',
	default: value,
	description: 'Any CSS width.',
});

const height = (value: string): PropDoc => ({
	name: 'height',
	type: 'string',
	default: value,
	description: 'Any CSS height.',
});

const iframe_styles = (fallback: string): PropDoc => ({
	name: 'iframe_styles',
	type: 'string',
	description: `Inline styles for the iframe. ${fallback}`,
});

export const components: ComponentDoc[] = [
	{
		name: 'AnchorFm',
		category: 'audio',
		description:
			'A podcast episode from Anchor, now Spotify for Creators.',
		keywords: [
			'anchor',
			'podcast',
			'episode',
			'spotify for creators',
		],
		props: [
			{
				name: 'episode_url',
				type: 'string',
				required: true,
				description:
					'The path after `anchor.fm/` in the episode embed URL.',
			},
			height(`'100px'`),
			width(),
			loading,
		],
	},
	{
		name: 'Bluesky',
		category: 'social',
		description: 'A Bluesky post that resizes to fit its content.',
		keywords: ['bsky', 'post', 'skeet', 'at protocol'],
		props: [
			{
				name: 'post_id',
				type: 'string',
				default: `''`,
				description:
					'The `did:plc:…/app.bsky.feed.post/…` identifier from the post’s embed option.',
			},
			{
				name: 'theme',
				type: `'light' | 'dark' | 'system'`,
				default: `'light'`,
				description:
					'`system` follows the visitor’s colour scheme preference.',
			},
			width(),
			iframe_styles('Added after the component’s own.'),
		],
	},
	{
		name: 'Buzzsprout',
		category: 'audio',
		description: 'A Buzzsprout podcast episode player.',
		keywords: ['podcast', 'episode', 'player'],
		props: [
			{
				name: 'buzzsprout_id',
				type: 'string',
				required: true,
				description:
					'The podcast ID and episode slug, e.g. `190346/9866589-episode-title`.',
			},
			width(),
			height(`'200px'`),
			loading,
		],
	},
	{
		name: 'CodePen',
		category: 'code',
		description: 'A pen from CodePen, as a preview or an editor.',
		keywords: ['pen', 'playground', 'demo', 'css', 'js'],
		props: [
			{
				name: 'codepen_id',
				type: 'string',
				default: `''`,
				description:
					'The last part of the pen’s URL, e.g. `WNMvXpa`.',
			},
			{
				name: 'tabs',
				type: `string[] | 'js' | 'css' | 'scss' | 'less' | 'result'`,
				default: `'result'`,
				description: 'Which tabs are open to start with.',
			},
			{
				name: 'click_to_load',
				type: 'boolean',
				default: 'true',
				description:
					'Show a preview that loads the pen when clicked.',
			},
			{
				name: 'editable',
				type: 'boolean',
				default: 'true',
				description: 'Let visitors edit the code in place.',
			},
			{
				name: 'theme',
				type: `'light' | 'dark' | 'default' | string`,
				default: `'default'`,
				description: 'A CodePen theme name or ID.',
			},
			height(`'500px'`),
			width(),
			loading,
			iframe_styles('Defaults to the `height` and `width` props.'),
		],
	},
	{
		name: 'Deezer',
		category: 'audio',
		description: 'A Deezer show, album, playlist or track.',
		keywords: ['music', 'podcast', 'playlist', 'album'],
		props: [
			{
				name: 'frame_src',
				type: 'string',
				default: `''`,
				description: 'The content type and ID, e.g. `show/496882`.',
			},
			{
				name: 'theme',
				type: 'string',
				default: `'auto'`,
				description: '`auto`, `light` or `dark`.',
			},
			height(`'300px'`),
			width(),
			loading,
			iframe_styles(
				'Defaults to the `height` and `width` props with rounded corners.',
			),
		],
	},
	{
		name: 'GenericEmbed',
		category: 'more',
		description:
			'An iframe for anything without its own component yet.',
		keywords: ['iframe', 'custom', 'any', 'other', 'fallback'],
		props: [
			{
				name: 'src',
				type: 'string',
				default: `''`,
				description: 'The URL to embed.',
			},
			{
				name: 'title',
				type: 'string',
				default: `''`,
				description: 'Describes the iframe to assistive technology.',
			},
			height(`'152px'`),
			width(),
			loading,
			{
				name: 'children',
				type: 'Snippet',
				description: 'Your own markup, rendered beside the iframe.',
			},
			{
				name: '...rest',
				type: 'HTMLIframeAttributes',
				description: 'Every other attribute is passed to the iframe.',
			},
		],
	},
	{
		name: 'Gist',
		category: 'code',
		description: 'A GitHub gist with syntax highlighting.',
		keywords: ['github', 'snippet', 'code'],
		props: [
			{
				name: 'gist_uri',
				type: 'string',
				default: `''`,
				description:
					'The username and gist ID, e.g. `Ennoriel/8c89dc…`.',
			},
			width(),
			height(`'320px'`),
			loading,
			iframe_styles('Defaults to the `height` and `width` props.'),
		],
	},
	{
		name: 'Guild',
		category: 'more',
		description: 'A Guild community card or its events.',
		keywords: ['community', 'events', 'meetup', 'presentations'],
		props: [
			{
				name: 'card_id',
				type: 'string',
				required: true,
				description:
					'The slug of the guild, user, event or presentation.',
			},
			{
				name: 'type',
				type: `'guild' | 'user' | 'event' | 'presentation'`,
				default: `'guild'`,
				description: 'What `card_id` refers to.',
			},
			{
				name: 'display_type',
				type: `'card' | 'item' | 'events/latest' | 'events/upcoming' | 'events/past' | 'presentations/latest' | 'presentations/upcoming' | 'presentations/other'`,
				default: `'card'`,
				description: 'Which view of it to show.',
			},
			height(`'380px'`),
			width(),
			loading,
		],
	},
	{
		name: 'Relive',
		category: 'more',
		description: 'A Relive 3D video of a ride, run or hike.',
		keywords: ['cycling', 'running', 'hiking', 'map', 'activity'],
		props: [
			{
				name: 'relive_id',
				type: 'string',
				default: `''`,
				description: 'The ID from the Relive share link.',
			},
			width(),
			loading,
		],
	},
	{
		name: 'SimpleCast',
		category: 'audio',
		description: 'A Simplecast podcast episode player.',
		keywords: ['podcast', 'episode', 'player', 'simplecast'],
		props: [
			{
				name: 'episode_id',
				type: 'string',
				default: `''`,
				description: 'The episode’s UUID.',
			},
			{
				name: 'theme',
				type: 'string',
				default: `'dark'`,
				description: '`dark` or `light`.',
			},
			loading,
		],
	},
	{
		name: 'Slides',
		category: 'more',
		description: 'A slide deck from Slides.com.',
		keywords: ['presentation', 'deck', 'talk', 'reveal'],
		props: [
			{
				name: 'username',
				type: 'string',
				default: `''`,
				description: 'The deck owner’s username.',
			},
			{
				name: 'title',
				type: 'string',
				default: `''`,
				description: 'The deck’s slug from its URL.',
			},
			{
				name: 'byline',
				type: `'hidden' | 'visible' | 'default'`,
				default: `'hidden'`,
				description: 'Show the author under the deck.',
			},
			{
				name: 'share',
				type: `'hidden' | 'visible' | 'default'`,
				default: `'hidden'`,
				description: 'Show the share button.',
			},
			{
				name: 'style',
				type: `'light' | 'dark' | 'hidden' | 'transparent' | 'default'`,
				default: `'dark'`,
				description: 'The style of the footer bar.',
			},
			width(),
			height(`'420px'`),
			loading,
		],
	},
	{
		name: 'SoundCloud',
		category: 'audio',
		description: 'A SoundCloud track or set.',
		keywords: ['music', 'track', 'playlist', 'set'],
		props: [
			{
				name: 'soundcloud_link',
				type: 'string',
				default: `''`,
				description: 'The full URL of the track or set.',
			},
			{
				name: 'show_visual',
				type: 'boolean',
				default: 'true',
				description:
					'Use the artwork player rather than the compact one.',
			},
			width(),
			height(`'300px'`),
			loading,
			iframe_styles('Added after the component’s own.'),
		],
	},
	{
		name: 'Spotify',
		category: 'audio',
		description: 'A Spotify show, episode, album, playlist or track.',
		keywords: ['music', 'podcast', 'playlist', 'album', 'track'],
		props: [
			{
				name: 'spotify_link',
				type: 'string',
				default: `''`,
				description:
					'The content type and ID, e.g. `show/4XPl3uEEL9hvqMkoZrzbx5`.',
			},
			width(),
			height(`'152px'`),
			loading,
			iframe_styles(
				'Defaults to the `height` and `width` props with rounded corners.',
			),
		],
	},
	{
		name: 'StackBlitz',
		category: 'code',
		description: 'A StackBlitz project with editor and preview.',
		keywords: ['playground', 'ide', 'editor', 'webcontainer', 'demo'],
		props: [
			{
				name: 'id',
				type: 'string',
				default: `''`,
				description:
					'The project ID from its URL, e.g. `vitejs-vite-yyoood`.',
			},
			{
				name: 'view',
				type: `'editor' | 'preview' | 'default'`,
				default: `'default'`,
				description: 'Open on the editor, the preview or both.',
			},
			{
				name: 'click_to_load',
				type: 'boolean',
				default: 'true',
				description: 'Wait for a click before starting the project.',
			},
			{
				name: 'hide_navigation',
				type: 'boolean',
				default: 'false',
				description: 'Hide the preview’s URL bar.',
			},
			{
				name: 'hide_explorer',
				type: 'boolean',
				default: 'true',
				description: 'Hide the file explorer.',
			},
			{
				name: 'theme',
				type: `'light' | 'dark' | 'default' | string`,
				default: `'dark'`,
				description: 'The editor theme.',
			},
			{
				name: 'file',
				type: 'string',
				description: 'The file to open first.',
			},
			width(),
			height(`'500px'`),
			loading,
			iframe_styles('Defaults to the `height` and `width` props.'),
		],
	},
	{
		name: 'Threads',
		category: 'social',
		description: 'A Threads post that resizes to fit its content.',
		keywords: ['meta', 'instagram', 'post'],
		props: [
			{
				name: 'post_id',
				type: 'string',
				default: `''`,
				description:
					'The end of the post’s link, e.g. `DePOFVxEe_o`.',
			},
			{
				name: 'theme',
				type: `'light' | 'dark' | 'auto'`,
				default: `'light'`,
				description:
					'`auto` follows the visitor’s colour scheme preference.',
			},
			width(),
			iframe_styles('Added after the component’s own.'),
		],
	},
	{
		name: 'TikTok',
		category: 'video',
		description: 'A TikTok video in the official player.',
		keywords: ['short', 'video', 'player', 'vertical'],
		props: [
			{
				name: 'tiktok_id',
				type: 'string',
				required: true,
				description: 'The number at the end of the video’s URL.',
			},
			width(),
			height(`'600px'`),
			{
				name: 'controls',
				type: 'boolean',
				default: 'true',
				description: 'Show the player controls.',
			},
			{
				name: 'progress_bar',
				type: 'boolean',
				default: 'true',
				description: 'Show the progress bar.',
			},
			{
				name: 'play_button',
				type: 'boolean',
				default: 'true',
				description: 'Show the play button.',
			},
			{
				name: 'volume_control',
				type: 'boolean',
				default: 'true',
				description: 'Show the volume control.',
			},
			{
				name: 'fullscreen_button',
				type: 'boolean',
				default: 'true',
				description: 'Show the fullscreen button.',
			},
			{
				name: 'timestamp',
				type: 'boolean',
				default: 'true',
				description: 'Show the current time and duration.',
			},
			{
				name: 'loop',
				type: 'boolean',
				default: 'false',
				description: 'Start again when the video ends.',
			},
			{
				name: 'autoplay',
				type: 'boolean',
				default: 'false',
				description: 'Start playing as soon as it loads.',
			},
			{
				name: 'music_info',
				type: 'boolean',
				default: 'false',
				description: 'Show the sound used in the video.',
			},
			{
				name: 'description',
				type: 'boolean',
				default: 'false',
				description: 'Show the video’s caption.',
			},
			{
				name: 'rel',
				type: 'boolean',
				default: 'true',
				description: 'Show related videos at the end.',
			},
			{
				name: 'native_context_menu',
				type: 'boolean',
				default: 'true',
				description: 'Keep TikTok’s right-click menu.',
			},
			{
				name: 'closed_caption',
				type: 'boolean',
				default: 'true',
				description: 'Show closed captions when there are any.',
			},
			loading,
		],
	},
	{
		name: 'Toot',
		category: 'social',
		description: 'A post from any Mastodon instance.',
		keywords: ['mastodon', 'fediverse', 'post', 'activitypub'],
		props: [
			{
				name: 'instance',
				type: 'string',
				default: `''`,
				description: 'The instance’s domain, e.g. `mas.to`.',
			},
			{
				name: 'username',
				type: 'string',
				default: `''`,
				description: 'The author, with or without the leading `@`.',
			},
			{
				name: 'toot_id',
				type: 'string',
				default: `''`,
				description: 'The number at the end of the post’s URL.',
			},
		],
	},
	{
		name: 'Tweet',
		category: 'social',
		description: 'A post from X, formerly Twitter.',
		keywords: ['twitter', 'x', 'post', 'status'],
		props: [
			{
				name: 'tweet_link',
				type: 'string',
				default: `''`,
				description:
					'The username and status, e.g. `adamwathan/status/959078631434731521`.',
			},
			{
				name: 'theme',
				type: `'light' | 'dark'`,
				default: `'light'`,
				description: 'The colour scheme of the post.',
			},
		],
	},
	{
		name: 'Vimeo',
		category: 'video',
		description: 'A Vimeo video at any aspect ratio.',
		keywords: ['video', 'player', 'film'],
		props: [
			{
				name: 'vimeo_id',
				type: 'string',
				default: `''`,
				description: 'The number at the end of the video’s URL.',
			},
			{
				name: 'autoplay',
				type: 'boolean',
				default: 'false',
				description: 'Start playing as soon as it loads.',
			},
			{
				name: 'aspect_ratio',
				type: 'string',
				default: `'16:9'`,
				description: 'Width to height, e.g. `4:3` or `9:16`.',
			},
			{
				name: 'skip_to',
				type: '{ h?: number; m?: number; s?: number }',
				default: '{ h: 0, m: 0, s: 0 }',
				description: 'Where to start playing from.',
			},
			loading,
		],
	},
	{
		name: 'YouTube',
		category: 'video',
		description: 'A YouTube video or playlist, without cookies.',
		keywords: ['video', 'playlist', 'player', 'yt', 'nocookie'],
		props: [
			{
				name: 'youtube_id',
				type: 'string',
				default: `''`,
				description: 'The video’s ID, the `v` in its URL.',
			},
			{
				name: 'list_id',
				type: 'string',
				default: `''`,
				description:
					'A playlist ID. Used when `youtube_id` is empty.',
			},
			{
				name: 'index',
				type: 'number',
				default: '0',
				description: 'Which video in the playlist to start on.',
			},
			{
				name: 'autoplay',
				type: 'boolean',
				default: 'false',
				description: 'Start playing as soon as it loads.',
			},
			{
				name: 'mute',
				type: 'boolean',
				default: 'false',
				description: 'Start with the sound off.',
			},
			{
				name: 'controls',
				type: 'boolean',
				default: 'true',
				description: 'Show the player controls.',
			},
			{
				name: 'loop',
				type: 'boolean',
				default: 'false',
				description: 'Start again when the video or playlist ends.',
			},
			{
				name: 'modest_branding',
				type: 'boolean',
				default: 'false',
				description: 'Use minimal YouTube branding.',
			},
			{
				name: 'rel',
				type: 'boolean',
				default: 'false',
				description: 'Show related videos at the end.',
			},
			{
				name: 'aspect_ratio',
				type: 'string',
				default: `'16:9'`,
				description: 'Width to height, e.g. `4:3` or `9:16`.',
			},
			{
				name: 'skip_to',
				type: '{ h?: number; m?: number; s?: number }',
				default: '{ h: 0, m: 0, s: 0 }',
				description: 'Where to start playing from.',
			},
			loading,
			{
				name: 'iframe_styles',
				type: 'string',
				default: `'border-radius: 0.6rem;'`,
				description: 'Inline styles for the iframe.',
			},
		],
	},
	{
		name: 'Zencastr',
		category: 'audio',
		description: 'A Zencastr podcast episode player.',
		keywords: ['podcast', 'episode', 'player'],
		props: [
			{
				name: 'zencastr_id',
				type: 'string',
				default: `''`,
				description: 'The ID from the episode’s embed code.',
			},
		],
	},
];

/** `YouTube` → `youtube`. Matches the heading anchors of the old
 * single page docs, so `/#youtube` can still be sent somewhere. */
export const slug_of = (name: string) => name.toLowerCase();

export const href_of = (name: string) =>
	`/components/${slug_of(name)}`;

export const find_component = (slug: string) =>
	components.find((component) => slug_of(component.name) === slug);

export const components_in = (category: CategoryId) =>
	components.filter((component) => component.category === category);

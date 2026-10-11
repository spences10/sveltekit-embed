<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { load_script } from '../attachments/load-script.js';

	type TwitterWindow = Window & {
		twttr?: { widgets?: { load: (element?: HTMLElement) => void } };
	};

	interface Props {
		tweet_link?: string;
		theme?: 'light' | 'dark';
	}

	let { tweet_link = '', theme = 'light' }: Props = $props();

	const widgets_src = 'https://platform.twitter.com/widgets.js';

	let loaded = $state(false);

	const load_tweet: Attachment<HTMLElement> = (node) => {
		const twttr = (window as TwitterWindow).twttr;

		// The script has already run, so ask it to render this tweet.
		if (twttr?.widgets) {
			twttr.widgets.load(node);
			loaded = true;
			return;
		}

		// Another tweet is loading the script, which renders every tweet
		// on the page once it runs.
		const pending = document.querySelector<HTMLScriptElement>(
			`script[src="${widgets_src}"]`,
		);
		if (pending) {
			const on_load = () => (loaded = true);
			pending.addEventListener('load', on_load);
			return () => pending.removeEventListener('load', on_load);
		}

		return load_script(widgets_src, {
			on_load: () => (loaded = true),
		})(node);
	};
</script>

<div
	class="tweet-wrapper"
	data-theme={theme}
	data-loaded={loaded}
	{@attach load_tweet}
>
	<blockquote class="twitter-tweet" data-theme={theme}>
		<a href={`https://twitter.com/${tweet_link}`}>Loading Tweet...</a>
	</blockquote>
</div>

<style>
	.tweet-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 12px;
		border-radius: 13px;
		overflow: hidden;
	}

	.tweet-wrapper :global(iframe) {
		border-radius: 13px !important;
	}

	.twitter-tweet {
		display: block;
		margin: 0;
		padding: 0;
	}

	.twitter-tweet a {
		color: #1da1f2;
		font-weight: bold;
		text-decoration: none;
	}
</style>

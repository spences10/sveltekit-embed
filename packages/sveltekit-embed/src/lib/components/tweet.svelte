<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		tweet_link?: string;
		theme?: 'light' | 'dark';
	}

	let { tweet_link = '', theme = 'light' }: Props = $props();

	let twitter_widgets_script = $state.raw<HTMLScriptElement | null>(
		null,
	);

	const load_twitter_widgets_script = () => {
		if (
			document.querySelector(
				'script[src*="platform.twitter.com/widgets.js"]',
			)
		) {
			return;
		}

		if (twitter_widgets_script) return;

		twitter_widgets_script = document.createElement('script');
		twitter_widgets_script.src =
			'https://platform.twitter.com/widgets.js';
		twitter_widgets_script.async = true;
		document.head.appendChild(twitter_widgets_script);
	};

	const remove_twitter_widget_script = () => {
		if (!twitter_widgets_script) return;
		document.head.removeChild(twitter_widgets_script);
		twitter_widgets_script = null;
	};

	onMount(() => {
		load_twitter_widgets_script();
		return () => {
			remove_twitter_widget_script();
		};
	});
</script>

<div
	class="tweet-wrapper"
	data-theme={theme}
	data-loaded={twitter_widgets_script != null}
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

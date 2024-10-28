<script lang="ts">
	interface Props {
		tweetLink?: string;
		isDarkMode?: boolean;
	}

	let { tweetLink = '', isDarkMode = false }: Props = $props();

	let twitter_widgets_script: HTMLScriptElement | null = null;

	const load_twitter_widgets_script = () => {
		if (twitter_widgets_script) return;
		twitter_widgets_script = document.createElement('script');
		twitter_widgets_script.src =
			'https://platform.twitter.com/widgets.js';
		twitter_widgets_script.async = true;
		document.head.appendChild(twitter_widgets_script);
	};

	const remove_twitter_widget_script = () => {
		if (twitter_widgets_script) {
			document.head.removeChild(twitter_widgets_script);
			twitter_widgets_script = null;
		}
	};

	$effect(() => {
		load_twitter_widgets_script();
		return () => {
			remove_twitter_widget_script();
		};
	});
</script>

<div class="tweet-wrapper">
	<blockquote
		class="twitter-tweet"
		data-theme={isDarkMode ? 'dark' : null}
	>
		<a href={`https://twitter.com/${tweetLink}`}>Loading Tweet...</a>
	</blockquote>
</div>

<style>
	.tweet-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 12px;
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

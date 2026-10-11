<script lang="ts">
	import { load_script } from '../attachments/load-script.js';

	interface Props {
		zencastr_id?: string;
	}

	let { zencastr_id = '' }: Props = $props();
</script>

<section
	style="display:flex; justify-content: center;"
	{@attach load_script(
		'https://zencastr.com/static/js/embed-player.js',
		{ parent: 'body' },
	)}
>
	<blockquote
		class="zenplayer"
		data-episode-href={`https://zencastr.com/embed/${zencastr_id}`}
		style="background: black; border-radius: 12px; font-family: system-ui; width: 480px; height: 480px; position: relative; color: white; margin: 0;"
	>
		<img
			alt=""
			style="width: 120px; display: inline-block; position: absolute; top: calc(50%); left: calc(50%); transform: translate(-50%, -50%);"
		/>
		<a
			href={`https://zencastr.com/embed/${zencastr_id}`}
			target="_blank"
			rel="noopener noreferrer"
			style="color: white; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); text-decoration: none;"
		>
			View on Zencastr
		</a>
	</blockquote>
</section>

<!-- 
  Examples for guilds, users, events and presentations
  Guilds:
  https://guild.host/embeds/guild/svelte-society-london/card
  https://guild.host/embeds/guild/svelte-society-london/events/latest
  https://guild.host/embeds/guild/svelte-society-london/events/upcoming
  https://guild.host/embeds/guild/svelte-society-london/events/past
  https://guild.host/embeds/guild/svelte-society-london/presentations/latest
  https://guild.host/embeds/guild/svelte-society-london/presentations/upcoming
  https://guild.host/embeds/guild/svelte-society-london/presentations/other 
  Users:
  https://guild.host/embeds/user/spences10/card
  https://guild.host/embeds/user/spences10/events/latest
  https://guild.host/embeds/user/spences10/events/upcoming
  https://guild.host/embeds/user/spences10/events/past
  https://guild.host/embeds/user/spences10/presentations/latest
  https://guild.host/embeds/user/spences10/presentations/upcoming
  https://guild.host/embeds/user/spences10/presentations/other
  Events:
  https://guild.host/embeds/event/svelte-london-february-h0ghig/card
  https://guild.host/embeds/event/svelte-london-february-h0ghig/item
  Presentations:
  https://guild.host/embeds/presentation/microfrontends-with-e6mtnf/card
  https://guild.host/embeds/presentation/microfrontends-with-e6mtnf/item
-->
<script lang="ts">
	import GeneralObserver from './general-observer.svelte';

	interface Props {
		height?: string;
		width?: string;
		card_id: string;
		type?: 'guild' | 'user' | 'event' | 'presentation';
		display_type?:
			| 'card'
			| 'item'
			| 'events/latest'
			| 'events/upcoming'
			| 'events/past'
			| 'presentations/latest'
			| 'presentations/upcoming'
			| 'presentations/other';
		disable_observer?: boolean;
	}

	let {
		height = '380px',
		width = '100%',
		card_id,
		type = 'guild',
		display_type = 'card',
		disable_observer = false,
	}: Props = $props();
</script>

<GeneralObserver {disable_observer}>
	<div
		class="guild-card"
		style={`
      position: relative;
      height: ${height};
      width: ${width};
    `}
	>
		<iframe
			data-testid="guild-card"
			title={`guild-card-${card_id}`}
			src={`https://guild.host/embeds/${type}/${card_id}/${display_type}`}
			{height}
			{width}
			frameborder="0"
			scrolling="no"
			style={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
      `}
		></iframe>
	</div>
</GeneralObserver>

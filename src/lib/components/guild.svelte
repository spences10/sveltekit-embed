<!-- 
  Examples for guilds, users, events and presentations
  Guilds:
  https://beta.guild.host/embeds/guild/svelte-society-london/card
  https://beta.guild.host/embeds/guild/svelte-society-london/events/latest
  https://beta.guild.host/embeds/guild/svelte-society-london/events/upcoming
  https://beta.guild.host/embeds/guild/svelte-society-london/events/past
  https://beta.guild.host/embeds/guild/svelte-society-london/presentations/latest
  https://beta.guild.host/embeds/guild/svelte-society-london/presentations/upcoming
  https://beta.guild.host/embeds/guild/svelte-society-london/presentations/other 
  Users:
  https://beta.guild.host/embeds/user/spences10/card
  https://beta.guild.host/embeds/user/spences10/events/latest
  https://beta.guild.host/embeds/user/spences10/events/upcoming
  https://beta.guild.host/embeds/user/spences10/events/past
  https://beta.guild.host/embeds/user/spences10/presentations/latest
  https://beta.guild.host/embeds/user/spences10/presentations/upcoming
  https://beta.guild.host/embeds/user/spences10/presentations/other
  Events:
  https://beta.guild.host/embeds/event/svelte-london-february-h0ghig/card
  https://beta.guild.host/embeds/event/svelte-london-february-h0ghig/item
  Presentations:
  https://beta.guild.host/embeds/presentation/microfrontends-with-e6mtnf/card
  https://beta.guild.host/embeds/presentation/microfrontends-with-e6mtnf/item
-->
<script lang="ts">
	import GeneralObserver from './general-observer.svelte'

	export let height: string = '380'
	export let width: string = '100'
	export let card_id: string
	export let type: 'guild' | 'user' | 'event' | 'presentation' =
		'guild'
	export let display_type:
		| 'card'
		| 'item'
		| 'events/latest'
		| 'events/upcoming'
		| 'events/past'
		| 'presentations/latest'
		| 'presentations/upcoming'
		| 'presentations/other' = 'card'
</script>

<GeneralObserver>
	<div
		class="guild-card"
		style={`
      position: relative;
      height: ${height}px;
      width: ${width}%;
    `}
	>
		<iframe
			data-testid="guild-card"
			title={`guild-card-${card_id}`}
			src={`https://beta.guild.host/embeds/${type}/${card_id}/${display_type}`}
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
		/>
	</div>
</GeneralObserver>

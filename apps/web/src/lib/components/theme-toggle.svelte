<script lang="ts">
	import { is_dark, set_mode } from '#lib/state/theme.svelte.js';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
</script>

<!-- Which icon shows is CSS driven off the active theme, so it's
     right on first paint without waiting for hydration -->
<button
	type="button"
	class="theme-toggle btn btn-square btn-ghost"
	aria-label="Switch between light and dark theme"
	onclick={() => set_mode(is_dark() ? 'light' : 'dark')}
>
	<SunIcon class="sun size-5" aria-hidden="true" />
	<MoonIcon class="moon size-5" aria-hidden="true" />
</button>

<style>
	.theme-toggle :global(.sun) {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light']))
			.theme-toggle
			:global(.sun) {
			display: block;
		}
		:global(:root:not([data-theme='light']))
			.theme-toggle
			:global(.moon) {
			display: none;
		}
	}

	:global(:root[data-theme='dark']) .theme-toggle :global(.sun) {
		display: block;
	}
	:global(:root[data-theme='dark']) .theme-toggle :global(.moon) {
		display: none;
	}
</style>

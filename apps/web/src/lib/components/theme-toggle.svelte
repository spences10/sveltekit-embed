<script lang="ts">
	import {
		read_stored_mode,
		set_mode,
		theme,
		type ThemeMode,
	} from '#lib/state/theme.svelte.js';
	import { Monitor, Moon, Sun, type IconNode } from 'lucide';
	import { MorphIcon, type MorphHandle } from 'morphicons/svelte';
	import { onMount } from 'svelte';

	const modes: Record<
		ThemeMode,
		{ icon: IconNode; label: string; next: ThemeMode }
	> = {
		light: { icon: Sun, label: 'Light', next: 'dark' },
		dark: { icon: Moon, label: 'Dark', next: 'system' },
		system: { icon: Monitor, label: 'System', next: 'light' },
	};

	const mode = $derived(modes[theme.mode]);

	let morph = $state<MorphHandle>();
	// What the icon is showing. Unset until the stored choice is read,
	// so that first sync is a jump and only real changes morph
	let shown: IconNode | undefined;

	onMount(() => {
		read_stored_mode();
		shown = modes[theme.mode].icon;
		morph?.set(shown);
	});

	// Follows the mode wherever it's set from, the palette included
	$effect(() => {
		const { icon } = mode;
		if (shown && icon !== shown) {
			shown = icon;
			morph?.morphTo(icon);
		}
	});
</script>

<button
	type="button"
	class="btn btn-square btn-ghost"
	aria-label="Theme: {mode.label}. Switch to {modes[mode.next].label}"
	title="Theme: {mode.label}"
	onclick={() => set_mode(mode.next)}
>
	<MorphIcon
		bind:this={morph}
		icon={Monitor}
		size={20}
		reducedMotion="user"
	/>
</button>

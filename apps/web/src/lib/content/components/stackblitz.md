<script>
	import { StackBlitz } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore yyoood -->

```svelte live
<StackBlitz id="vitejs-vite-yyoood" hide_navigation />
```

`id` is the project's name in its URL, after `stackblitz.com/edit/`.

The project waits for a click before it boots. Pass
`click_to_load={false}` to start it with the page.

## Open on a file

Show the editor only, with the file explorer and a particular file
open.

```svelte
<StackBlitz
	id="vitejs-vite-yyoood"
	view="editor"
	file="src/App.svelte"
	hide_explorer={false}
/>
```

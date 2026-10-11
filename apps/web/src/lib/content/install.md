Add the package to a SvelteKit project. It needs Svelte 5.29 or later.

```bash
pnpm add -D sveltekit-embed
```

Import the component you need and give it an ID or a link.

```svelte title="+page.svelte"
<script>
	import { YouTube } from 'sveltekit-embed';
</script>

<YouTube youtube_id="dQw4w9WgXcQ" />
```

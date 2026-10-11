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

It works the same way in Markdown with mdsvex, which is how the pages
on this site are written.

```svelte title="+page.md"
<script>
	import { YouTube } from 'sveltekit-embed';
</script>

# My post

<YouTube youtube_id="dQw4w9WgXcQ" />
```

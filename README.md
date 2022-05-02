# SvelteKit Embed

This is a collection of embed components I use on a regular basis
packaged up for use.

Each component is wrapped in an intersection observer
`GeneralObserver` which will load up the component when it scrolls
into the viewport.

## Use

```bash
npm install sveltekit-embed
```

Use like a normal Svelte component:

```html
<script>
  import { AnchorFm } from 'sveltekit-embed'
</script>

<AnchorFm
  height="165"
  episodeUrl="purrfect-dev/embed/episodes/1-31---Delivering-Digital-Content-with-GraphCMS-e14g55c/a-a650v9a"
/>
```

## Thanks

Credit to [@pauliescanlon](https://github.com/pauliescanlon) for the
original version of this project in
[MDX Embed](https://github.com/pauliescanlon/mdx-embed).

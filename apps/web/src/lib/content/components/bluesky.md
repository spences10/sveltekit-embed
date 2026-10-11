<script>
	import { Bluesky } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore nlvjelw,pddq,qoglleko,bsky,tnwn2k -->

```svelte live
<Bluesky
	post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>
```

On Bluesky, open the post's menu and choose **Embed post**. The
`post_id` is the `did:plc:…` identifier in the code it gives you,
without the leading `at://`.

The embed reports its own height, so the component resizes to fit the
post. It loads in its own way and does not take a `loading` prop.

## Dark and system themes

Set `theme` to `dark`, or to `system` to follow the visitor's
preference.

```svelte live
<Bluesky
	theme="dark"
	post_id="did:plc:nlvjelw3dy3pddq7qoglleko/app.bsky.feed.post/3l6ud34tnwn2k"
/>
```

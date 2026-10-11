<script>
	import { Tweet } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore adamwathan -->

```svelte live
<Tweet
	tweet_link="adamwathan/status/959078631434731521"
	theme="dark"
/>
```

`tweet_link` is the username and status from the post's URL, the part
after `twitter.com/` or `x.com/`.

The post is rendered by X's own script, which is loaded once however
many posts are on the page. Until it runs, visitors see the post as a
plain link. It does not take a `loading` prop.

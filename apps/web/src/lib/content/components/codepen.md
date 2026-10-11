<script>
	import { CodePen } from 'sveltekit-embed';
</script>

<!-- cSpell:ignore Mvxpa -->

```svelte live
<CodePen codepen_id="WNMvXpa" />
```

For a pen at `https://codepen.io/spences10/pen/WNMvXpa`, the
`codepen_id` is the last part, `WNMvXpa`.

The embed starts as a preview and loads the pen when it is clicked.
Pass `click_to_load={false}` to run it straight away.

## Choose the open tabs

`tabs` takes one tab or several. This opens the CSS beside the result,
in the dark theme.

```svelte
<CodePen
	codepen_id="WNMvXpa"
	tabs={['css', 'result']}
	theme="dark"
	click_to_load={false}
/>
```

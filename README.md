# SvelteKit Embed
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a collection of embed components I use on a regular basis
packaged up for use.

Each component is wrapped in an intersection observer
`GeneralObserver` which will load up the component when it scrolls
into the viewport.

## Use

```bash
npm i -D sveltekit-embed
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

## Got questions?

[Start a discussion](https://github.com/spences10/sveltekit-embed/discussions/new)

## Something not work?

Create an
[issue](https://github.com/spences10/sveltekit-embed/issues/new)

## Todo

- [ ] Add more components
- [ ] Tests... need adding
- [ ] If you know how to type a custom action in Svelte, please submit
      a PR

## Developing locally

You can use the components locally via the `src/routes/index.svelte`
file. If there any changes you want to test in the package then run
the `sveltekit package` command and you can then install that package
locally:

```bash
# package with sveltkit
npm run package
# install local package
npm i -D ./package
```

If you're adding a new component to `src/lib/components` then add the
export to `src/lib/index.ts`.

## Thanks

Credit to [@pauliescanlon](https://github.com/pauliescanlon) for the
original version of this project in
[MDX Embed](https://github.com/pauliescanlon/mdx-embed).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://scottspence.com/"><img src="https://avatars.githubusercontent.com/u/234708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Scott Spence</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=spences10" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Cahllagerfeld"><img src="https://avatars.githubusercontent.com/u/43843195?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cahllagerfeld</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=Cahllagerfeld" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
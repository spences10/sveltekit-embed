# SvelteKit Embed

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![MadeWithSvelte.com shield](https://madewithsvelte.com/storage/repo-shields/3786-shield.svg)](https://madewithsvelte.com/p/sveltekit-embed/shield-link)

This is a collection of embed components I use on a regular basis
packaged up for use.

![sveltekit embed cover](.github/sveltekit-embed.jpg)

Each component with the exception of `Toot` and `Tweet` is wrapped in
an intersection observer `GeneralObserver` which will load up the
component when it scrolls into the viewport.

## Use it

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

## Supported platforms

- AnchorFm
- Buzzsprout
- CodePen
- Deezer
- GenericEmbed
- Gist
- Guild
- Relive
- SimpleCast
- Slides
- SoundCloud
- Spotify
- StackBlitz
- Toot
- Tweet
- Vimeo
- YouTube
- Zencastr

## Got questions?

[Start a discussion](https://github.com/spences10/sveltekit-embed/discussions/new)

## Something not work?

Create an
[issue](https://github.com/spences10/sveltekit-embed/issues/new)

## Todo

- [ ] Add more components
- [ ] Tests... need expanding
- [x] If you know how to type a custom action in Svelte, please submit
      a PR

## Developing locally

Rename the `.sample.env` file to `.env`.

```bash
mv .sample.env .env
```

Create the component in the `src/lib/components` directory.

Add the component to the `src/lib/index.ts` file:

```ts
export { default as MyComponent } from './components/my-component.svelte'
```

Import the component locally into the `src/routes/+page.md` file:

```svelte
import {MyComponent} from '$lib'
```

After importing the component, add it to the
`Available Components List` and document it:

```markdown
## Available Components List

- [MyComponent](#mycomponent)
```

````markdown
## MyComponent

Props:

```ts
myComponentId: string = ''
```

Usage:

```html
<MyComponent myComponentId="..." />
```

Output:

<MyComponent myComponentId="..." />
````

Test the package locally with the `package:local` script:

```bash
npm run package:local
```

Test locally, then submit a PR 🙏

## Thanks

Credit to [@pauliescanlon](https://github.com/pauliescanlon) for the
original version of this project in
[MDX Embed](https://github.com/pauliescanlon/mdx-embed).

## Packaging for NPM

Scott, this is here for you to remember how to do this 🙃

Although I detailed this in
[Making npm Packages with SvelteKit](https://scottspence.com/posts/making-npm-packages-with-sveltekit)
I think it's best to put it here as I always come to the README and
the instructions are never there! 😅

**Publish the project to NPM**

```bash
# authenticate with npm
npm login
# bump version with npm
npm version 0.0.8
# package with sveltekit
pnpm run package
# publish
npm publish
# push tags to github
git push --tags
```

**Publish @next package**

Same procedure except use the `--tag` flag:

```bash
# authenticate with npm
npm login
# bump version with npm
npm version 0.0.13
# package with sveltekit
pnpm run package
# publish with tag
npm publish --tag next
# push tags to github
git push --tags
```

**Move @next package to latest**

```bash
# authenticate with npm
npm login
# move @next to latest
npm dist-tag add sveltekit-embed@0.0.13 latest
```

## Contributors ✨

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://scottspence.com/"><img src="https://avatars.githubusercontent.com/u/234708?v=4?s=100" width="100px;" alt="Scott Spence"/><br /><sub><b>Scott Spence</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=spences10" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Cahllagerfeld"><img src="https://avatars.githubusercontent.com/u/43843195?v=4?s=100" width="100px;" alt="Cahllagerfeld"/><br /><sub><b>Cahllagerfeld</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=Cahllagerfeld" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://matiashernandez.dev/"><img src="https://avatars.githubusercontent.com/u/282006?v=4?s=100" width="100px;" alt="Matías Hernández Arellano"/><br /><sub><b>Matías Hernández Arellano</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=matiasfha" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ruhr.social/@sphinxc0re"><img src="https://avatars.githubusercontent.com/u/3702016?v=4?s=100" width="100px;" alt="Julian Laubstein"/><br /><sub><b>Julian Laubstein</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=sphinxc0re" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ennoriel"><img src="https://avatars.githubusercontent.com/u/23211596?v=4?s=100" width="100px;" alt="Maxime Dupont"/><br /><sub><b>Maxime Dupont</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=Ennoriel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jamesperkins.dev/"><img src="https://avatars.githubusercontent.com/u/45409975?v=4?s=100" width="100px;" alt="James Perkins"/><br /><sub><b>James Perkins</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=perkinsjr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://joaopalmeiro.github.io/"><img src="https://avatars.githubusercontent.com/u/17132927?v=4?s=100" width="100px;" alt="João Palmeiro"/><br /><sub><b>João Palmeiro</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=joaopalmeiro" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jason3S"><img src="https://avatars.githubusercontent.com/u/3740137?v=4?s=100" width="100px;" alt="Jason Dent"/><br /><sub><b>Jason Dent</b></sub></a><br /><a href="https://github.com/spences10/sveltekit-embed/commits?author=Jason3S" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

([emoji key](https://allcontributors.org/docs/en/emoji-key)):

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

import { describe, expect, it } from 'vite-plus/test';
import {
	categories,
	components,
	find_component,
	slug_of,
} from './components.js';

// The docs describe the library by hand. These read the library's
// source so a new component or prop can't ship without its docs
const library = '../../../../../packages/sveltekit-embed/src/lib';

const sources = import.meta.glob<string>(
	'../../../../../packages/sveltekit-embed/src/lib/{index.ts,components/*.svelte}',
	{ query: '?raw', import: 'default', eager: true },
);
const pages = Object.keys(
	import.meta.glob('../content/components/*.md'),
).map((path) => path.split('/').at(-1)!.replace(/\.md$/, ''));

const source_of = (file: string) =>
	sources[`${library}/components/${file}.svelte`];

const exported = [
	...sources[`${library}/index.ts`].matchAll(
		/export \{ default as (\w+) \} from '\.\/components\/([\w-]+)\.svelte'/g,
	),
].map(([, name, file]) => ({ name, file }));

/** Prop names from a component's `interface Props` */
function source_props(file: string) {
	const body = /interface Props[^{]*\{([\s\S]*?)\n\t\}/.exec(
		source_of(file),
	);
	return [...(body?.[1] ?? '').matchAll(/^\t\t(\w+)\??:/gm)].map(
		([, name]) => name,
	);
}

describe('component docs', () => {
	it('finds the components the library exports', () => {
		expect(exported.length).toBeGreaterThan(20);
	});

	it('documents every exported component, and nothing else', () => {
		expect(components.map(({ name }) => name).sort()).toEqual(
			exported.map(({ name }) => name).sort(),
		);
	});

	it('has a page for every component', () => {
		expect([...pages].sort()).toEqual(
			components.map(({ name }) => slug_of(name)).sort(),
		);
	});

	it.each(exported)('lists the props of $name', ({ name, file }) => {
		const documented = find_component(slug_of(name))!
			.props.map((prop) => prop.name)
			// `...rest` stands for attributes passed through, not a prop
			.filter((prop) => !prop.startsWith('...'));

		expect(documented.sort()).toEqual(source_props(file).sort());
	});

	it('marks required props, and only those, as required', () => {
		for (const { name, file } of exported) {
			const source = source_of(file);
			for (const prop of find_component(slug_of(name))!.props) {
				if (prop.name.startsWith('...')) continue;
				const optional = new RegExp(`^\\t\\t${prop.name}\\?:`, 'm');
				expect(
					!optional.test(source),
					`${name}.${prop.name} required`,
				).toBe(Boolean(prop.required));
			}
		}
	});

	it('puts every component in a known category', () => {
		const ids: string[] = categories.map(({ id }) => id);
		for (const component of components) {
			expect(ids).toContain(component.category);
		}
	});

	it('keeps the list alphabetical for previous and next links', () => {
		const names = components.map(({ name }) => name);
		expect(names).toEqual(
			[...names].sort((a, b) => a.localeCompare(b)),
		);
	});
});

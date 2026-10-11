import {
	components,
	find_component,
	slug_of,
} from '#lib/docs/components.js';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { EntryGenerator, PageLoad } from './$types';

const pages = import.meta.glob<{ default: Component }>(
	'/src/lib/content/components/*.md',
);

export const entries: EntryGenerator = () =>
	components.map((component) => ({ slug: slug_of(component.name) }));

export const load: PageLoad = async ({ params }) => {
	const component = find_component(params.slug);
	const load_page =
		pages[`/src/lib/content/components/${params.slug}.md`];

	if (!component || !load_page) {
		error(404, `There's no component called "${params.slug}"`);
	}

	const index = components.indexOf(component);

	return {
		component,
		content: (await load_page()).default,
		previous: components[index - 1],
		next: components[index + 1],
	};
};

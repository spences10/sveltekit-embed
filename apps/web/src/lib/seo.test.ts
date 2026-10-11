import { describe, expect, it } from 'vite-plus/test';
import { components, find_component } from './docs/components.js';
import {
	component_schema,
	component_seo,
	guide_schema,
	home_schema,
	seo_config,
} from './seo.js';

const youtube = find_component('youtube')!;

// Structured data is typed as schema.org's huge unions, plain records
// are easier to assert on
const nodes = (schema: unknown) => schema as Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('seo_config', () => {
	it('fills in the site wide fields for a page', () => {
		const config = seo_config(component_seo(youtube));

		expect(config).toMatchObject({
			title: 'YouTube | SvelteKit Embed',
			url: 'https://sveltekit-embed.pages.dev/components/youtube',
			website: 'sveltekit-embed.pages.dev',
			site_name: 'SvelteKit Embed',
			author_name: 'Scott Spence',
			twitter_handle: '@spences10',
			twitter_card_type: 'summary_large_image',
			open_graph_image:
				'https://sveltekit-embed.pages.dev/og/youtube.png',
		});
	});

	it('leaves the site name off the home page title', () => {
		const config = seo_config({
			title: 'SvelteKit Embed',
			description: 'About',
			path: '/',
			card: 'home',
			card_alt: 'Home',
		});

		expect(config.title).toBe('SvelteKit Embed');
		expect(config.url).toBe('https://sveltekit-embed.pages.dev/');
	});

	it('keeps component descriptions short enough for search results', () => {
		for (const component of components) {
			const { description } = component_seo(component);
			expect(description.length, component.name).toBeLessThan(165);
		}
	});
});

describe('structured data', () => {
	it('lists every component on the home page', () => {
		const list = nodes(home_schema()).find(
			(node) => node['@type'] === 'ItemList',
		)!;

		expect(list.itemListElement).toHaveLength(components.length);
		expect(list.itemListElement[0]).toMatchObject({
			position: 1,
			name: components[0].name,
		});
	});

	it('describes a component page as an article with breadcrumbs', () => {
		const [site, article, trail] = nodes(component_schema(youtube));

		expect(article.isPartOf['@id']).toBe(site['@id']);

		expect(article).toMatchObject({
			'@type': 'TechArticle',
			headline: 'YouTube',
			url: 'https://sveltekit-embed.pages.dev/components/youtube',
		});
		expect(
			trail.itemListElement.map(
				(crumb: { name: string }) => crumb.name,
			),
		).toEqual(['Home', 'Video', 'YouTube']);
	});

	it('puts a guide directly under home', () => {
		const [, , trail] = nodes(
			guide_schema(
				{
					title: 'Lazy loading',
					description: 'How embeds load',
					path: '/lazy-loading',
					card: 'lazy-loading',
					card_alt: 'Lazy loading',
				},
				'Lazy loading',
			),
		);

		expect(trail.itemListElement).toHaveLength(2);
		expect(trail.itemListElement[1].item).toBe(
			'https://sveltekit-embed.pages.dev/lazy-loading',
		);
	});
});

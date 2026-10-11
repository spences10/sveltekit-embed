import type { SchemaOrgProps, SeoConfig } from 'svead';
import { share_card_url, site } from './config.js';
import {
	categories,
	components,
	href_of,
	type ComponentDoc,
} from './docs/components.js';

type Schema = Extract<SchemaOrgProps['schema'], unknown[]>;

export interface PageSeo {
	/** Without the site name, which is added to every page but home */
	title: string;
	description: string;
	/** From the root, e.g. `/lazy-loading`. `/` is the home page */
	path: string;
	/** The page's card in static/og, without the extension */
	card: string;
	card_alt: string;
}

const absolute = (path: string) =>
	path === '/' ? `${site.url}/` : `${site.url}${path}`;

/** Everything svead's Head needs, the per-page parts filled in */
export function seo_config(page: PageSeo): SeoConfig {
	return {
		title:
			page.path === '/' ? page.title : `${page.title} | ${site.name}`,
		description: page.description,
		url: absolute(page.path),
		// twitter:domain, so the host rather than the origin
		website: new URL(site.url).host,
		language: 'en_GB',
		site_name: site.name,
		author_name: site.author.name,
		twitter_handle: site.author.twitter,
		twitter_card_type: 'summary_large_image',
		open_graph_image: share_card_url(page.card),
		open_graph_image_alt: page.card_alt,
	};
}

const author = {
	'@type': 'Person',
	name: site.author.name,
	url: site.author.url,
} as const;

// In every page's graph, so the articles' isPartOf has a target
const website_id = `${site.url}/#website`;

const website = {
	'@type': 'WebSite',
	'@id': website_id,
	name: site.name,
	url: `${site.url}/`,
	description: site.description,
	inLanguage: 'en-GB',
	author,
} as const;

/** The trail to a page, home first. Each crumb is a name and a path */
function breadcrumbs(...crumbs: [name: string, path: string][]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [['Home', '/'] as const, ...crumbs].map(
			([name, path], index) => ({
				'@type': 'ListItem' as const,
				position: index + 1,
				name,
				item: absolute(path),
			}),
		),
	} as const;
}

function article(page: PageSeo, about: string) {
	return {
		'@type': 'TechArticle',
		headline: page.title,
		description: page.description,
		url: absolute(page.path),
		image: share_card_url(page.card),
		inLanguage: 'en-GB',
		about,
		author,
		isPartOf: { '@id': website_id },
	} as const;
}

/** The site, the library's source and the list of component pages */
export function home_schema(): Schema {
	return [
		website,
		{
			'@type': 'SoftwareSourceCode',
			name: site.package,
			description: site.description,
			url: `${site.url}/`,
			codeRepository: site.repo,
			programmingLanguage: ['Svelte', 'TypeScript'],
			runtimePlatform: 'SvelteKit',
			license: 'https://opensource.org/licenses/MIT',
			author,
		},
		{
			'@type': 'ItemList',
			name: `${site.name} components`,
			numberOfItems: components.length,
			itemListElement: components.map((component, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: component.name,
				url: absolute(href_of(component.name)),
			})),
		},
	];
}

export function component_seo(component: ComponentDoc): PageSeo {
	return {
		title: component.name,
		description: `${component.description} Props, defaults and a live example of the ${component.name} component from ${site.package}.`,
		path: href_of(component.name),
		card: component.name.toLowerCase(),
		card_alt: `${component.name}. ${component.description}`,
	};
}

export function component_schema(component: ComponentDoc): Schema {
	const category = categories.find(
		({ id }) => id === component.category,
	)!;
	return [
		website,
		article(
			component_seo(component),
			`The ${component.name} Svelte component`,
		),
		breadcrumbs(
			// Categories are sections of the home page
			[category.label, `/#${category.id}`],
			[component.name, href_of(component.name)],
		),
	];
}

/** A guide page that sits directly under home */
export function guide_schema(page: PageSeo, about: string): Schema {
	return [
		website,
		article(page, about),
		breadcrumbs([page.title, page.path]),
	];
}

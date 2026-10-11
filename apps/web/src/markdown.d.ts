// mdsvex compiles `.md` files to Svelte components
declare module '*.md' {
	const component: import('svelte').Component;
	export default component;
}

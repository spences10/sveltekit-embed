import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { coverageConfigDefaults, defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

export default defineConfig({
	plugins: [sveltekit({ adapter: adapter() })],
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
		coverage: {
			include: ['src/**/*.{ts,svelte}'],
			reporter: ['text-summary', 'html'],
			exclude: [
				...coverageConfigDefaults.exclude,
				'**/config.{js,ts,cjs}',
				'**/*.config.{js,ts,cjs}',
				'**/e2e/**',
				'**/lib/index.ts',
				'**/routes/page.svelte',
			],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
	},
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && PORT=4173 node build/index.js',
		port: 4173,
	},
	testDir: 'e2e',
});

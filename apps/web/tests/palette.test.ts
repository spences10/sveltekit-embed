import { expect, test } from '@playwright/test';

test('home page lists the components', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', {
			level: 1,
			name: /Embed media in your Svelte apps/,
		}),
	).toBeVisible();
	await expect(
		page.getByRole('link', { name: /^YouTube A YouTube video/ }),
	).toHaveAttribute('href', '/components/youtube');
});

test('command palette finds a component by keyword', async ({
	page,
}) => {
	await page.goto('/');
	await page.keyboard.press('Control+k');

	const input = page.getByRole('combobox', {
		name: 'Search components',
	});
	await expect(input).toBeFocused();

	// "mastodon" is a keyword of Toot, it isn't in the name
	await input.fill('mastodon');
	await expect(page.getByRole('option')).toHaveCount(1);
	await page.keyboard.press('Enter');

	await expect(page).toHaveURL('/components/toot');
	await expect(
		page.getByRole('heading', { level: 1, name: 'Toot' }),
	).toBeVisible();
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('command palette opens from the header and closes on escape', async ({
	page,
}) => {
	await page.goto('/components/youtube');
	await page
		.getByRole('banner')
		.getByRole('button', { name: 'Search components' })
		.click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('command palette switches theme', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('/');
	await page.getByRole('combobox').fill('dark');
	await page.keyboard.press('Enter');

	await expect(page.locator('html')).toHaveAttribute(
		'data-theme',
		'dark',
	);
});

test('old heading anchors go to the component page', async ({
	page,
}) => {
	await page.goto('/#youtube');

	await expect(page).toHaveURL('/components/youtube');
});

test('component page renders the embed and its props', async ({
	page,
}) => {
	await page.goto('/components/youtube');

	await expect(
		page.locator(
			'iframe[src*="youtube-nocookie.com/embed/dQw4w9WgXcQ"]',
		),
	).toBeAttached();
	await expect(
		page.getByRole('rowheader', { name: /^youtube_id/ }),
	).toBeVisible();
});

test('theme toggle cycles light, dark and system', async ({
	page,
}) => {
	await page.goto('/');
	const toggle = page.getByRole('button', { name: /^Theme:/ });
	const html = page.locator('html');

	await expect(toggle).toHaveAccessibleName(/^Theme: System/);

	await toggle.click();
	await expect(html).toHaveAttribute('data-theme', 'light');

	await toggle.click();
	await expect(html).toHaveAttribute('data-theme', 'dark');

	// The choice is there before the app starts on the next visit
	await page.reload();
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await expect(toggle).toHaveAccessibleName(/^Theme: Dark/);

	await toggle.click();
	await expect(html).not.toHaveAttribute('data-theme');
	await expect(toggle).toHaveAccessibleName(/^Theme: System/);
});

test('line numbers toggle on every code block and stay out of copies', async ({
	page,
	context,
}) => {
	await context.grantPermissions([
		'clipboard-read',
		'clipboard-write',
	]);
	await page.goto('/lazy-loading');

	const numbers = page.locator('.twinkleplop .ln');
	await expect(numbers.first()).toBeHidden();

	await page
		.getByRole('button', { name: 'Line numbers' })
		.first()
		.click();
	await expect(numbers.first()).toBeVisible();
	await expect(numbers.last()).toBeVisible();

	await page
		.getByRole('button', { name: 'Copy code' })
		.first()
		.click();
	expect(
		await page.evaluate(() => navigator.clipboard.readText()),
	).toBe('<YouTube youtube_id="dQw4w9WgXcQ" loading="eager" />');
});

test('pages point at a share card that exists', async ({
	page,
	request,
}) => {
	for (const path of ['/', '/components/youtube', '/lazy-loading']) {
		await page.goto(path);
		const image = await page
			.locator('meta[property="og:image"]')
			.getAttribute('content');

		// The meta tag carries the production origin, the file is local
		const card = await request.get(new URL(image!).pathname);
		expect(card.status(), `${path} share card`).toBe(200);
		expect(card.headers()['content-type']).toBe('image/png');
	}
});

test('pages carry structured data', async ({ page }) => {
	await page.goto('/components/youtube');

	const json = await page
		.locator('script[type="application/ld+json"]')
		.textContent();
	const types = JSON.parse(json!)['@graph'].map(
		(node: { '@type': string }) => node['@type'],
	);

	expect(types).toEqual(['WebSite', 'TechArticle', 'BreadcrumbList']);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://sveltekit-embed.pages.dev/components/youtube',
	);
});

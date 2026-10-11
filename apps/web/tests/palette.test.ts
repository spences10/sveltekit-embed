import { expect, test } from '@playwright/test';

test('home page lists the components', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', { level: 1, name: /Paste an ID/ }),
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

import { expect, test } from '@playwright/test';

test('index page has expected container headings', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Container A' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Container B' })).toBeVisible();
});

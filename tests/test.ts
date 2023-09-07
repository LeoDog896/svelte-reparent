import { expect, test } from '@playwright/test';

test('index page has expected container headings', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Container A' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Container B' })).toBeVisible();
});

test('componente reparenting works', async ({ page }) => {
	await page.goto('/');

	// precheck: input is in container A
	const oldContainerA = page.getByRole('main').locator('div').filter({ hasText: 'Container A' });
	await expect(oldContainerA.locator('input').first()).toBeVisible();

	// add unkept text "State" to the input
	await page.getByPlaceholder('Enter unkept state').click();
	await page.getByPlaceholder('Enter unkept state').fill('State');

	// move component from container A to container B
	const containerB = page.getByRole('main').locator('div').filter({ hasText: 'Container B' });
	await containerB.getByRole('button').click();
	// check if input is in container B
	await expect(containerB.locator('input').first()).toBeVisible();
	// check if input has unkept text "State"
	await expect(containerB.locator('input').first()).toHaveValue('State');

	// move component from container B to container A
	const containerA = page.getByRole('main').locator('div').filter({ hasText: 'Container A' });
	await containerA.getByRole('button').click();
	// check if input is in container A
	await expect(containerA.locator('input').first()).toBeVisible();
	// check if input has unkept text "State"
	await expect(containerA.locator('input').first()).toHaveValue('State');

	// double click to check resillience
	await page
		.getByRole('main')
		.locator('div')
		.filter({ hasText: 'Container B' })
		.getByRole('button')
		.click();
	await page
		.getByRole('main')
		.locator('div')
		.filter({ hasText: 'Container B' })
		.getByRole('button')
		.click();
	await page
		.getByRole('main')
		.locator('div')
		.filter({ hasText: 'Container A' })
		.getByRole('button')
		.click();

	// ensure that input is in container A
	await expect(
		page
			.getByRole('main')
			.locator('div')
			.filter({ hasText: 'Container A' })
			.locator('input')
			.first()
	).toBeVisible();
	// ensure that input has unkept text "State"
	await expect(
		page
			.getByRole('main')
			.locator('div')
			.filter({ hasText: 'Container A' })
			.locator('input')
			.first()
	).toHaveValue('State');
});

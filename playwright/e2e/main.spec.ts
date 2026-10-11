import { expect, test } from '@playwright/test';

test.describe('Main Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-cy="table-row"]').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[data-cy="table-loading"]')).toHaveCount(0);
  });

  test('should search for an entity', async ({ page }) => {
    await page.locator('[data-cy="search-input"]').fill('copyright');
    await expect(page.locator('[data-cy="table-body"] tr', { hasText: /copyright/i }).first()).toBeVisible();
    await expect(page.locator('[data-cy="table-body"]')).not.toContainText('ampersand');
  });

  test('should change category', async ({ page }) => {
    await page.locator('[data-cy="category-select"]').click();
    await page.locator('[data-cy="category-option-greekAndCoptic"] [data-cy="category-option-label"]').click();
    await expect(page.locator('[data-cy="table-body"] tr', { hasText: /alpha/i }).first()).toBeVisible();
  });

  test('should hide a column', async ({ page }) => {
    await expect(page.locator('[data-cy="table-head"] th', { hasText: 'decimal' })).toBeVisible();
    await page.locator('[data-cy="hidden-columns-button"]').click();
    await page.locator('[data-cy="hidden-column-option"] span', { hasText: 'decimal' }).click();
    await page.getByRole('heading', { name: 'EntityMe' }).click();
    await expect(page.locator('[data-cy="table-head"] th', { hasText: 'decimal' })).toBeHidden();
  });

  test('should favourite an item and see it in the favourites list', async ({ page }) => {
    await page.locator('[data-cy="search-input"]').fill('copyright');
    await expect(page.locator('[data-cy="table-body"] tr', { hasText: /copyright/i }).first()).toBeVisible();

    await page.locator('tr', { hasText: /COPYRIGHT SIGN/i }).locator('[data-cy="favourite-button"]').click();

    await page.locator('[data-cy="search-input"]').fill('');

    await page.locator('[data-cy="category-select"]').click();
    await page.locator('[data-cy="category-option-favourites"]', { hasText: 'Favourites' }).click();

    await expect(page.locator('[data-cy="table-row"]')).toHaveCount(1);
    await expect(page.locator('[data-cy="table-body"] tr', { hasText: /copyright/i })).toBeVisible();
  });
});

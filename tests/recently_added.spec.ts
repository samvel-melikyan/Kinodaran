import { test, expect} from '@playwright/test';

test.describe('Recently Added', () => {
  test.beforeEach(async ({ page }) => {
    // await page.pause();
    await page.goto('https://kinodaran.com/');
    await page.getByRole('button', { name: 'Start Watching' }).click();
    await page.waitForTimeout(10000); // Wait for the page to load
  });
  

  test('The section has a visible header', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const header = await section_recentlyAdded.locator('h4');
    await expect(header).toBeVisible();
    await expect(header).toContainText('RECENTLY ADDED');
  });


  test.only('Hover on item', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const item = await section_recentlyAdded.locator('.movie-item.movie-item__md').first();
    await expect (item).not.toHaveClass('movie-item movie-item__md scaling');
    await item.hover();
    await expect (item).toHaveClass('movie-item movie-item__md scaling');
  });




});

// await expect (page.locator('.action-btns > button').first()).toBeVisible();
// await expect ( page.locator('.media-rating-button-group > button').first()).toBeVisible();
// await expect ( page.locator('.fade-item > .btn').first()).toBeVisible();
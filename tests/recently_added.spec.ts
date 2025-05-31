import { test, expect} from '@playwright/test';

test.describe('Recently Added', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://kinodaran.com/');

    if (testInfo.title.includes('logged in')) {
      await logIn(page, 'msla@mail.ru', 'qazwsx123!@#');
    } else { 
      await page.getByRole('button', { name: 'Start Watching' }).click();
    }
    await page.waitForTimeout(5000); // Wait for the page to load
  });
  

  test('The section has a visible header', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const header = await section_recentlyAdded.locator('h4');
    await expect(header).toBeVisible();
    await expect(header).toContainText('RECENTLY ADDED');
  });


  test('Hover on item', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const item = await section_recentlyAdded.locator('.movie-item.movie-item__md').first();
    await expect (item).not.toHaveClass('movie-item movie-item__md scaling');
    await item.hover();
    await expect (item).toHaveClass('movie-item movie-item__md scaling');
  });


  test('Click on item', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const item = await section_recentlyAdded.locator('.movie-item.movie-item__md img').first();
    await item.click();

    await expect(page.locator('.h6-alt.weight-bold.mb-v2-4')).toBeVisible();
    await expect(page.locator('.mt-v2-12').first()).toBeVisible();
    await expect(page.getByText('Cast and Crew')).toBeVisible();
  });


  test('Should open "Create Account" page for unregistered user', async ({page}) => {
    const section_recentlyAdded = await page.locator('.mb-v2-14.mt-v2-md-20').first();
    const item = await section_recentlyAdded.locator('.movie-item.movie-item__md').first();
    await item.hover();
    await expect (item).toHaveClass('movie-item movie-item__md scaling');
    const button = await item.locator('button:has(svg path[d*="M10.8904"])');   
    await button.click();
    await expect (page.getByRole('paragraph').filter({ hasText: 'Create Account' })).toBeVisible();
  }); 


  test.only('Movie should be added to List for logged in user', async ({page}) => {
    const section = await page.locator('.mb-v2-14.mt-v2-md-20'); 
    let item = await section.first().locator('.movie-item.movie-item__md').first(); 
    await item.hover();
    
    const button_addTList = await item.locator('button:has(svg path[d*="M10.8904"])');         
    await button_addTList.click();
    const myList = await section.first().textContent() || '';        
    await expect(myList.toLowerCase()).toContain('My List'.toLowerCase()); 

    await page.waitForTimeout(4000); // Wait for the page to update

    item = await section.first().locator('.movie-item.movie-item__md').first();
    await item.hover();
    await await item.locator('button:has(svg path[d*="M19.2251"])').click();
    const ok = await section.first().textContent() || '';
    
    await expect(await page.getByText('My List')).not.toBeVisible();
    console.log(ok, '--------------');
    
    await expect(ok).not.toContain('My List'.toLowerCase());
  }); 



});

async function logIn(page, email: string, password: string){
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('dialog', { name: 'Example Modal' }).locator('#email').fill(email);
  await page.getByRole('textbox', { name: 'Password *' }).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

// await expect (page.locator('.action-btns > button').first()).toBeVisible();
// await expect ( page.locator('.media-rating-button-group > button').first()).toBeVisible();
// await expect ( page.locator('.fade-item > .btn').first()).toBeVisible();
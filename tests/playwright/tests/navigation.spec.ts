import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { StorePage } from '../pages/StorePage';

test.describe('Site Navigation', () => {
  test('header logo navigates to home page', async ({ page }) => {
    const store = new StorePage(page);
    const home = new HomePage(page);
    await store.goto();
    await page.getByTestId('header-logo-link').click();
    await expect(home.homePage).toBeVisible();
  });

  test('navigate to About page via nav link', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('nav-about-link').click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByTestId('about-page')).toBeVisible();
  });

  test('navigate to Projects page via nav link', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('nav-projects-link').click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.getByTestId('projects-page')).toBeVisible();
  });

  test('navigate to Blog page via nav link', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('nav-blog-link').click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.getByTestId('blog-page')).toBeVisible();
  });

  test('navigate to Store page via nav link', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('nav-store-link').click();
    await expect(page).toHaveURL(/\/store/);
    await expect(page.getByTestId('store-page')).toBeVisible();
  });

  test('navigate to Contact page via nav link', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('nav-contact-link').click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByTestId('contact-page')).toBeVisible();
  });

  test('cart icon navigates to checkout', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.getByTestId('header-cart-link').click();
    await expect(page).toHaveURL(/\/checkout/);
  });

  test('hero View My Work button navigates to projects', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.viewWorkButton.click();
    await expect(page).toHaveURL(/\/projects/);
  });

  test('hero Get In Touch button navigates to contact', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.getInTouchButton.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});

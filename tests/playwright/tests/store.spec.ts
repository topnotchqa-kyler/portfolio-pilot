import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Store and Product Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('shopping-cart'));
  });

  test('store page displays product list', async ({ page }) => {
    const store = new StorePage(page);
    await store.goto();
    await expect(store.productList).toBeVisible();
    const cards = page.locator('[data-testid^="product-card-link-"]');
    await expect(cards).not.toHaveCount(0);
  });

  test('navigate to product detail page from store', async ({ page }) => {
    const store = new StorePage(page);
    const product = new ProductDetailPage(page);
    await store.goto();
    await store.getFirstProductCardLink().click();
    await expect(page).toHaveURL(/\/store\/.+/);
    await expect(product.productName).toBeVisible();
    await expect(product.productPrice).toBeVisible();
    await expect(product.addToCartButton).toBeVisible();
  });

  test('adding product to cart increments cart counter', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    const cartCounter = page.getByTestId('cart-counter');
    await expect(cartCounter).toBeVisible();
    await expect(cartCounter).toHaveText('1');
  });

  test('adding multiple products updates cart counter', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    await product.goto('prod_002');
    await product.addToCartButton.click();
    const cartCounter = page.getByTestId('cart-counter');
    await expect(cartCounter).toHaveText('2');
  });

  test('product detail page shows go to checkout after adding to cart', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    await expect(product.goToCheckoutButton).toBeVisible();
  });
});

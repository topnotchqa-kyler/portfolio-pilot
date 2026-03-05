import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('shopping-cart'));
  });

  test('empty cart shows empty cart view', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await expect(checkout.emptyCartView).toBeVisible();
  });

  test('checkout page shows heading when cart has items', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await expect(checkout.checkoutHeading).toBeVisible();
  });

  test('place order without filling form shows validation errors', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await checkout.placeOrderButton.click();
    const errorMessages = page.locator('p.text-destructive');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('complete checkout flow with debug fill', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await checkout.fillFormButton.click();
    await checkout.placeOrderButton.click();
    await expect(checkout.confirmationDialog).toBeVisible();
    await checkout.confirmationOkButton.click();
    await expect(page).toHaveURL('http://localhost:9002/');
  });

  test('back button returns to previous page', async ({ page }) => {
    const product = new ProductDetailPage(page);
    await product.goto('prod_001');
    await product.addToCartButton.click();
    const checkout = new CheckoutPage(page);
    await checkout.goto();
    await checkout.backButton.click();
    await expect(page).toHaveURL(/\/store\/prod_001/);
  });
});

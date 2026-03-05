import { Given, When, Then } from '@wdio/cucumber-framework';
import StorePage from '../page-objects/StorePage.js';
import ProductDetailPage from '../page-objects/ProductDetailPage.js';

Given('my cart is empty', async () => {
  await browser.url('/');
  await browser.execute(() => localStorage.removeItem('shopping-cart'));
});

Given('I am on the product detail page for product {string}', async (productId: string) => {
  await ProductDetailPage.open(productId);
  await ProductDetailPage.productName.waitForDisplayed({ timeout: 10000 });
});

When('I click on the first product card', async () => {
  const firstCard = await StorePage.getFirstProductCardLink();
  await firstCard.click();
});

When('I click the Add to Cart button', async () => {
  await ProductDetailPage.addToCartButton.waitForClickable({ timeout: 10000 });
  await ProductDetailPage.addToCartButton.click();
  await browser.pause(500);
});

When('I navigate to the product detail page for product {string}', async (productId: string) => {
  await ProductDetailPage.open(productId);
  await ProductDetailPage.productName.waitForDisplayed({ timeout: 10000 });
});

Then('the product list should be visible', async () => {
  await StorePage.productList.waitForDisplayed({ timeout: 10000 });
});

Then('at least one product card should be displayed', async () => {
  const cards = await $$('[data-testid^="product-card-link-"]');
  expect(cards.length).toBeGreaterThan(0);
});

Then('I should be on a product detail page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/store/'), { timeout: 10000 });
});

Then('the product name should be visible', async () => {
  await ProductDetailPage.productName.waitForDisplayed({ timeout: 10000 });
});

Then('the product price should be visible', async () => {
  await ProductDetailPage.productPrice.waitForDisplayed({ timeout: 10000 });
});

Then('the Add to Cart button should be visible', async () => {
  await ProductDetailPage.addToCartButton.waitForDisplayed({ timeout: 10000 });
});

Then('the cart counter should show {string}', async (count: string) => {
  const cartCounter = $('[data-testid="cart-counter"]');
  await cartCounter.waitForDisplayed({ timeout: 10000 });
  await expect(cartCounter).toHaveText(count);
});

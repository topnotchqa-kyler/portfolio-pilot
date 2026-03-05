import { Given, When, Then } from '@wdio/cucumber-framework';
import CheckoutPage from '../page-objects/CheckoutPage.js';
import ProductDetailPage from '../page-objects/ProductDetailPage.js';

Given('I have a product in my cart', async () => {
  await browser.execute(() => localStorage.removeItem('shopping-cart'));
  await ProductDetailPage.open('prod_001');
  await ProductDetailPage.addToCartButton.waitForClickable({ timeout: 10000 });
  await ProductDetailPage.addToCartButton.click();
  await browser.pause(500);
});

Given('I am on the checkout page', async () => {
  await CheckoutPage.open();
});

When('I navigate to the checkout page', async () => {
  await CheckoutPage.open();
});

When('I fill in the checkout form with test data', async () => {
  await CheckoutPage.fillFormButton.waitForClickable({ timeout: 10000 });
  await CheckoutPage.fillFormButton.click();
  await browser.pause(500);
});

When('I click the Place Order button', async () => {
  await CheckoutPage.placeOrderButton.waitForClickable({ timeout: 10000 });
  await CheckoutPage.placeOrderButton.click();
  await browser.pause(500);
});

When('I click the confirmation OK button', async () => {
  await CheckoutPage.confirmationOkButton.waitForClickable({ timeout: 10000 });
  await CheckoutPage.confirmationOkButton.click();
});

Then('the empty cart view should be visible', async () => {
  await CheckoutPage.emptyCartView.waitForDisplayed({ timeout: 10000 });
});

Then('the checkout heading should be visible', async () => {
  await CheckoutPage.checkoutHeading.waitForDisplayed({ timeout: 10000 });
});

Then('validation error messages should be displayed', async () => {
  await browser.pause(500);
  const formMessages = await $$('p.text-destructive');
  expect(formMessages.length).toBeGreaterThan(0);
});

Then('the order confirmation dialog should appear', async () => {
  await CheckoutPage.confirmationDialog.waitForDisplayed({ timeout: 10000 });
});

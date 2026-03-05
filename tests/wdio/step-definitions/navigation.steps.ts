import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../page-objects/HomePage.js';

Given('I am on the home page', async () => {
  await HomePage.open();
  await HomePage.homePage.waitForDisplayed({ timeout: 10000 });
});

Given('I am on the store page', async () => {
  await browser.url('/store');
  await $('[data-testid="store-page"]').waitForDisplayed({ timeout: 10000 });
});

When('I click the header logo link', async () => {
  await $('[data-testid="header-logo-link"]').click();
});

When('I click the About nav link', async () => {
  await $('[data-testid="nav-about-link"]').click();
});

When('I click the Projects nav link', async () => {
  await $('[data-testid="nav-projects-link"]').click();
});

When('I click the Blog nav link', async () => {
  await $('[data-testid="nav-blog-link"]').click();
});

When('I click the Store nav link', async () => {
  await $('[data-testid="nav-store-link"]').click();
});

When('I click the Contact nav link', async () => {
  await $('[data-testid="nav-contact-link"]').click();
});

When('I click the cart icon in the header', async () => {
  await $('[data-testid="header-cart-link"]').click();
});

Then('I should be on the home page', async () => {
  await $('[data-testid="home-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the about page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/about'), { timeout: 10000 });
  await $('[data-testid="about-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the projects page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/projects'), { timeout: 10000 });
  await $('[data-testid="projects-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the blog page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/blog'), { timeout: 10000 });
  await $('[data-testid="blog-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the store page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/store'), { timeout: 10000 });
  await $('[data-testid="store-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the contact page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/contact'), { timeout: 10000 });
  await $('[data-testid="contact-page"]').waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the checkout page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/checkout'), { timeout: 10000 });
});

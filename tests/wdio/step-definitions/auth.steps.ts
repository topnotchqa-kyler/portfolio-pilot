import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../page-objects/LoginPage.js';
import DashboardPage from '../page-objects/DashboardPage.js';

Given('I am on the login page', async () => {
  await LoginPage.open();
  await LoginPage.loginForm.waitForDisplayed({ timeout: 10000 });
});

Given('I am logged in', async () => {
  await LoginPage.debugLogin();
});

Given('I am on the dashboard page', async () => {
  await DashboardPage.open();
  await DashboardPage.dashboardPage.waitForDisplayed({ timeout: 10000 });
});

Given('I am not logged in', async () => {
  await browser.deleteCookies();
});

When('I click the Debug Login button', async () => {
  await LoginPage.debugButton.waitForClickable({ timeout: 10000 });
  await LoginPage.debugButton.click();
});

When('I click the Logout button', async () => {
  await DashboardPage.logoutButton.waitForClickable({ timeout: 10000 });
  await DashboardPage.logoutButton.click();
});

When('I navigate to the dashboard page', async () => {
  await DashboardPage.open();
});

Then('the login form should be visible', async () => {
  await LoginPage.loginForm.waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the dashboard page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/dashboard'), { timeout: 10000 });
});

Then('the dashboard heading should be visible', async () => {
  await DashboardPage.dashboardHeading.waitForDisplayed({ timeout: 10000 });
});

Then('I should be on the login page', async () => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('/login'), { timeout: 10000 });
  await LoginPage.loginForm.waitForDisplayed({ timeout: 10000 });
});

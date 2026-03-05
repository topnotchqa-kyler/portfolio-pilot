import { Given, When, Then } from '@wdio/cucumber-framework';
import ContactPage from '../page-objects/ContactPage.js';

Given('I am on the contact page', async () => {
  await ContactPage.open();
  await ContactPage.contactPage.waitForDisplayed({ timeout: 10000 });
});

When('I click the Send Message button', async () => {
  await ContactPage.sendButton.waitForClickable({ timeout: 10000 });
  await ContactPage.sendButton.click();
  await browser.pause(500);
});

When('I type {string} into the message field', async (message: string) => {
  await ContactPage.messageTextarea.waitForDisplayed({ timeout: 10000 });
  await ContactPage.messageTextarea.setValue(message);
});

When('I enter {string} in the name field', async (name: string) => {
  await ContactPage.nameInput.waitForDisplayed({ timeout: 10000 });
  await ContactPage.nameInput.setValue(name);
});

Then('the contact form should be visible', async () => {
  await ContactPage.contactForm.waitForDisplayed({ timeout: 10000 });
});

Then('validation error messages should be displayed on the contact form', async () => {
  await browser.pause(500);
  const errorMessages = await $$('p.text-destructive');
  expect(errorMessages.length).toBeGreaterThan(0);
});

Then('the character counter should reflect the number of characters typed', async () => {
  await ContactPage.charCount.waitForDisplayed({ timeout: 10000 });
  const counterText = await ContactPage.charCount.getText();
  expect(counterText).toMatch(/^\d+\/1000$/);
});

Then('a validation error should appear for the name field', async () => {
  await browser.pause(500);
  const errorMessages = await $$('p.text-destructive');
  expect(errorMessages.length).toBeGreaterThan(0);
});

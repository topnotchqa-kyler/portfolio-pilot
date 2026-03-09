import { When, Then } from '@wdio/cucumber-framework';
import ChatbotPage from '../page-objects/ChatbotPage.js';

When('I click the chatbot open button', async () => {
  await ChatbotPage.openButton.waitForClickable({ timeout: 10000 });
  await ChatbotPage.openButton.click();
  await browser.pause(500);
});

When('I type {string} into the chat input', async (message: string) => {
  await ChatbotPage.input.waitForDisplayed({ timeout: 10000 });
  await ChatbotPage.input.setValue(message);
});

When('I click the chat send button', async () => {
  await ChatbotPage.sendButton.waitForClickable({ timeout: 10000 });
  await ChatbotPage.sendButton.click();
  await browser.pause(500);
});

Then('the chatbot open button should be visible', async () => {
  await ChatbotPage.openButton.waitForDisplayed({ timeout: 10000 });
});

Then('the chat panel should be visible', async () => {
  await ChatbotPage.sheet.waitForDisplayed({ timeout: 10000 });
});

Then('the chat input field should be visible', async () => {
  await ChatbotPage.input.waitForDisplayed({ timeout: 10000 });
});

Then('the chat send button should be visible', async () => {
  await ChatbotPage.sendButton.waitForDisplayed({ timeout: 10000 });
});

Then('the user message should appear in the chat history', async () => {
  await ChatbotPage.firstMessage.waitForDisplayed({ timeout: 10000 });
});

Then("Kyra's response should appear in the chat history", async () => {
  await ChatbotPage.secondMessage.waitForDisplayed({ timeout: 30000 });
});

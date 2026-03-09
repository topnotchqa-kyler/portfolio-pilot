import { test, expect } from '@playwright/test';
import { ChatbotPage } from '../pages/ChatbotPage';

test.describe('Chatbot', () => {
  test('chatbot open button is visible on the homepage', async ({ page }) => {
    const chatbot = new ChatbotPage(page);
    await chatbot.goto();
    await expect(chatbot.openButton).toBeVisible();
  });

  test('opening the chatbot shows the chat interface', async ({ page }) => {
    const chatbot = new ChatbotPage(page);
    await chatbot.goto();
    await chatbot.open();
    await expect(chatbot.sheet).toBeVisible();
    await expect(chatbot.input).toBeVisible();
    await expect(chatbot.sendButton).toBeVisible();
    await expect(page.getByText('Chat with Kyra')).toBeVisible();
  });

  test('user message appears in chat after submitting', async ({ page }) => {
    const chatbot = new ChatbotPage(page);
    await chatbot.goto();
    await chatbot.open();
    await chatbot.input.fill('What projects has Kyler worked on?');
    await chatbot.sendButton.click();
    await expect(chatbot.message(0)).toBeVisible();
    await expect(chatbot.message(0)).toContainText('What projects has Kyler worked on?');
  });

  test('Kyra responds to a portfolio question', async ({ page }) => {
    test.setTimeout(45000);
    const chatbot = new ChatbotPage(page);
    await chatbot.goto();
    await chatbot.open();
    await chatbot.input.fill('What test frameworks does Kyler work with?');
    await chatbot.sendButton.click();
    await expect(chatbot.message(0)).toBeVisible();
    await expect(chatbot.message(1)).toBeVisible({ timeout: 30000 });
  });

  test('Kyra declines to answer an off-topic question', async ({ page }) => {
    test.setTimeout(45000);
    const chatbot = new ChatbotPage(page);
    await chatbot.goto();
    await chatbot.open();
    await chatbot.input.fill('What is the capital of France?');
    await chatbot.sendButton.click();
    await expect(chatbot.message(0)).toBeVisible();
    await expect(chatbot.message(1)).toBeVisible({ timeout: 30000 });
    await expect(chatbot.message(1)).not.toContainText('Paris');
  });
});

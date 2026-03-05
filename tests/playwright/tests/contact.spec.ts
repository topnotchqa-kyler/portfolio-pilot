import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test.describe('Contact Form', () => {
  test('contact page displays the contact form', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    await expect(contact.contactForm).toBeVisible();
  });

  test('submitting empty form shows validation errors', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    await contact.sendButton.click();
    const errors = page.locator('p.text-destructive');
    await expect(errors.first()).toBeVisible();
  });

  test('name field rejects input shorter than 2 characters', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    await contact.nameInput.fill('A');
    await contact.sendButton.click();
    const errors = page.locator('p.text-destructive');
    await expect(errors.first()).toBeVisible();
  });

  test('character counter updates as user types', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    const message = 'Hello, this is a test message';
    await contact.messageTextarea.fill(message);
    await expect(contact.charCount).toHaveText(`${message.length}/1000`);
  });

  test('character counter turns red above 900 characters', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    await contact.messageTextarea.fill('a'.repeat(901));
    await expect(contact.charCount).toHaveClass(/text-destructive/);
  });

  test('contact info section displays email phone and location', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.goto();
    await expect(page.getByTestId('contact-info-email')).toBeVisible();
    await expect(page.getByTestId('contact-info-phone')).toBeVisible();
    await expect(page.getByTestId('contact-info-location')).toBeVisible();
  });
});

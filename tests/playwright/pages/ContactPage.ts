import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly contactPage;
  readonly contactForm;
  readonly nameInput;
  readonly emailInput;
  readonly messageTextarea;
  readonly sendButton;
  readonly successMessage;
  readonly charCount;

  constructor(page: Page) {
    super(page);
    this.contactPage = page.getByTestId('contact-page');
    this.contactForm = page.getByTestId('contact-form');
    this.nameInput = page.getByTestId('contact-name-input');
    this.emailInput = page.getByTestId('contact-email-input');
    this.messageTextarea = page.getByTestId('contact-message-textarea');
    this.sendButton = page.getByTestId('contact-send-button');
    this.successMessage = page.getByTestId('contact-success-message');
    this.charCount = page.getByTestId('contact-message-char-count');
  }

  async goto() {
    await this.navigate('/contact');
    await this.contactPage.waitFor();
  }
}

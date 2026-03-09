import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatbotPage extends BasePage {
  readonly openButton;
  readonly sheet;
  readonly input;
  readonly sendButton;

  constructor(page: Page) {
    super(page);
    this.openButton = page.getByTestId('chatbot-open-button');
    this.sheet = page.getByTestId('chatbot-sheet');
    this.input = page.getByTestId('chatbot-input');
    this.sendButton = page.getByTestId('chatbot-send-button');
  }

  message(index: number) {
    return this.page.getByTestId(`chatbot-message-${index}`);
  }

  async goto() {
    await this.navigate('/');
    await this.openButton.waitFor();
  }

  async open() {
    await this.openButton.click();
    await this.sheet.waitFor();
  }
}

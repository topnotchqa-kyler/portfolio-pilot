import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async clearCart() {
    await this.page.evaluate(() => localStorage.removeItem('shopping-cart'));
  }
}

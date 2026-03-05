import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class StorePage extends BasePage {
  readonly storePage;
  readonly productList;

  constructor(page: Page) {
    super(page);
    this.storePage = page.getByTestId('store-page');
    this.productList = page.getByTestId('product-list');
  }

  async goto() {
    await this.navigate('/store');
    await this.storePage.waitFor();
  }

  getFirstProductCardLink() {
    return this.page.locator('[data-testid^="product-card-link-"]').first();
  }
}

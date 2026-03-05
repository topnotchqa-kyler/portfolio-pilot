import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName;
  readonly productPrice;
  readonly productDescription;
  readonly addToCartButton;
  readonly goToCheckoutButton;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');
    this.productDescription = page.getByTestId('product-description');
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.goToCheckoutButton = page.getByTestId('go-to-checkout-button');
  }

  async goto(productId: string) {
    await this.navigate(`/store/${productId}`);
    await this.productName.waitFor();
  }
}

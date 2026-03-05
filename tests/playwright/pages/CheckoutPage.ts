import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutPage;
  readonly checkoutHeading;
  readonly emptyCartView;
  readonly fillFormButton;
  readonly placeOrderButton;
  readonly confirmationDialog;
  readonly confirmationOkButton;
  readonly backButton;

  constructor(page: Page) {
    super(page);
    this.checkoutPage = page.getByTestId('checkout-page');
    this.checkoutHeading = page.getByTestId('checkout-heading');
    this.emptyCartView = page.getByTestId('empty-cart-view');
    this.fillFormButton = page.getByTestId('checkout-fill-form-button');
    this.placeOrderButton = page.getByTestId('checkout-place-order-button');
    this.confirmationDialog = page.getByTestId('checkout-confirmation-dialog');
    this.confirmationOkButton = page.getByTestId('checkout-confirmation-ok-button');
    this.backButton = page.getByTestId('checkout-back-button');
  }

  async goto() {
    await this.navigate('/checkout');
  }
}

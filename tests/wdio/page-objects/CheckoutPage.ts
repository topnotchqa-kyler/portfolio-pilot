import BasePage from './BasePage.js';

class CheckoutPage extends BasePage {
  get checkoutPage() { return $('[data-testid="checkout-page"]'); }
  get checkoutHeading() { return $('[data-testid="checkout-heading"]'); }
  get emptyCartView() { return $('[data-testid="empty-cart-view"]'); }
  get fillFormButton() { return $('[data-testid="checkout-fill-form-button"]'); }
  get placeOrderButton() { return $('[data-testid="checkout-place-order-button"]'); }
  get confirmationDialog() { return $('[data-testid="checkout-confirmation-dialog"]'); }
  get confirmationOkButton() { return $('[data-testid="checkout-confirmation-ok-button"]'); }
  get backButton() { return $('[data-testid="checkout-back-button"]'); }

  open() {
    return super.open('/checkout');
  }
}

export default new CheckoutPage();

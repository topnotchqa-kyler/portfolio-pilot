export class CheckoutPage {
  get checkoutHeading() { return cy.get('[data-testid="checkout-heading"]'); }
  get emptyCartView() { return cy.get('[data-testid="empty-cart-view"]'); }
  get fillFormButton() { return cy.get('[data-testid="checkout-fill-form-button"]'); }
  get placeOrderButton() { return cy.get('[data-testid="checkout-place-order-button"]'); }
  get confirmationDialog() { return cy.get('[data-testid="checkout-confirmation-dialog"]'); }
  get confirmationOkButton() { return cy.get('[data-testid="checkout-confirmation-ok-button"]'); }
  get backButton() { return cy.get('[data-testid="checkout-back-button"]'); }

  visit() {
    cy.visit('/checkout');
  }
}

export const checkoutPage = new CheckoutPage();

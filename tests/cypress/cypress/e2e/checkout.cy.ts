import { checkoutPage } from '../pages/CheckoutPage';

describe('Checkout Process', () => {
  it('empty cart shows empty cart view', () => {
    cy.clearCart();
    checkoutPage.visit();
    checkoutPage.emptyCartView.should('be.visible');
  });

  it('checkout page shows heading when cart has items', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    checkoutPage.checkoutHeading.should('be.visible');
  });

  it('place order without filling form shows validation errors', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    checkoutPage.placeOrderButton.click();
    cy.get('p.text-destructive').should('have.length.greaterThan', 0);
  });

  it('complete checkout flow using debug fill', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    checkoutPage.fillFormButton.click();
    checkoutPage.placeOrderButton.click();
    checkoutPage.confirmationDialog.should('be.visible');
    checkoutPage.confirmationOkButton.click();
    cy.url().should('eq', 'http://localhost:9002/');
  });

  it('cart counter is hidden after checkout completion', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    checkoutPage.fillFormButton.click();
    checkoutPage.placeOrderButton.click();
    checkoutPage.confirmationOkButton.click();
    cy.get('[data-testid="cart-counter"]').should('not.exist');
  });

  it('quantity increment button increases item quantity', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    cy.get('[data-testid^="checkout-increment-"]').first().click();
    cy.get('[data-testid^="checkout-quantity-"]').first().should('have.text', '2');
  });

  it('quantity decrement button decreases item quantity', () => {
    cy.clearCart();
    cy.addToCart('prod_001');
    checkoutPage.visit();
    cy.get('[data-testid^="checkout-increment-"]').first().click();
    cy.get('[data-testid^="checkout-decrement-"]').first().click();
    cy.get('[data-testid^="checkout-quantity-"]').first().should('have.text', '1');
  });
});

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      clearCart(): Chainable<void>;
      addToCart(productId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('[data-testid="login-debug-button"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('shopping-cart');
  });
});

Cypress.Commands.add('addToCart', (productId: string) => {
  cy.visit(`/store/${productId}`);
  cy.get('[data-testid="product-name"]').should('be.visible');
  cy.get('[data-testid="add-to-cart-button"]').click();
});

export {};

import { storePage } from '../pages/StorePage';

describe('Store and Product Browsing', () => {
  beforeEach(() => {
    cy.clearCart();
  });

  it('store page displays product list', () => {
    storePage.visit();
    storePage.productList.should('be.visible');
    cy.get('[data-testid^="product-card-link-"]').should('have.length.greaterThan', 0);
  });

  it('navigates to product detail page from store', () => {
    storePage.visit();
    storePage.firstProductCard.click();
    cy.url().should('match', /\/store\/.+/);
    cy.get('[data-testid="product-name"]').should('be.visible');
    cy.get('[data-testid="product-price"]').should('be.visible');
    cy.get('[data-testid="add-to-cart-button"]').should('be.visible');
  });

  it('adding a product to cart increments the cart counter', () => {
    cy.addToCart('prod_001');
    cy.get('[data-testid="cart-counter"]').should('be.visible').and('have.text', '1');
  });

  it('adding multiple products updates the cart counter', () => {
    cy.addToCart('prod_001');
    cy.addToCart('prod_002');
    cy.get('[data-testid="cart-counter"]').should('have.text', '2');
  });

  it('product detail page shows go to checkout button after adding to cart', () => {
    cy.addToCart('prod_001');
    cy.get('[data-testid="go-to-checkout-button"]').should('be.visible');
  });
});

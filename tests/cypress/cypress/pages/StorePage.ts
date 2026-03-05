export class StorePage {
  get productList() { return cy.get('[data-testid="product-list"]'); }
  get firstProductCard() { return cy.get('[data-testid^="product-card-link-"]').first(); }

  visit() {
    cy.visit('/store');
    cy.get('[data-testid="store-page"]').should('be.visible');
  }
}

export const storePage = new StorePage();

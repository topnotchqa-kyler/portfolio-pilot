describe('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog');
    cy.get('[data-testid="blog-page"]').should('be.visible');
  });

  it('blog page displays post list', () => {
    cy.get('[data-testid="blog-post-list"]').should('be.visible');
    cy.get('[data-testid^="blog-post-link-"]').should('have.length.greaterThan', 0);
  });

  it('blog page shows pagination controls', () => {
    cy.get('[data-testid="pagination-page-info"]').should('be.visible');
  });

  it('clicking a blog post navigates to the post page', () => {
    cy.get('[data-testid^="blog-post-link-"]').first().click();
    cy.url().should('match', /\/blog\/.+/);
    cy.get('[data-testid="blog-post-page"]').should('be.visible');
  });

  it('blog post page shows title content and date', () => {
    cy.get('[data-testid^="blog-post-link-"]').first().click();
    cy.get('[data-testid="post-title"]').should('be.visible');
    cy.get('[data-testid="post-content"]').should('be.visible');
    cy.get('[data-testid="post-date"]').should('be.visible');
  });

  it('next page button advances pagination when available', () => {
    cy.get('[data-testid="pagination-next"]').then(($btn) => {
      if (!$btn.is(':disabled') && $btn.attr('aria-disabled') !== 'true') {
        cy.wrap($btn).click();
        cy.get('[data-testid="pagination-page-info"]').should('contain', '2');
      } else {
        cy.get('[data-testid="pagination-page-info"]').should('contain', '1');
      }
    });
  });

  it('previous button is not shown on first page', () => {
    cy.get('[data-testid="pagination-previous"]').should('not.exist');
  });
});

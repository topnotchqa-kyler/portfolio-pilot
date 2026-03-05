describe('Site Navigation', () => {
  it('header logo navigates to home page', () => {
    cy.visit('/store');
    cy.get('[data-testid="header-logo-link"]').click();
    cy.get('[data-testid="home-page"]').should('be.visible');
  });

  it('navigates to About page via nav link', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-about-link"]').click();
    cy.url().should('include', '/about');
    cy.get('[data-testid="about-page"]').should('be.visible');
  });

  it('navigates to Projects page via nav link', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-projects-link"]').click();
    cy.url().should('include', '/projects');
    cy.get('[data-testid="projects-page"]').should('be.visible');
  });

  it('navigates to Blog page via nav link', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-blog-link"]').click();
    cy.url().should('include', '/blog');
    cy.get('[data-testid="blog-page"]').should('be.visible');
  });

  it('navigates to Store page via nav link', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-store-link"]').click();
    cy.url().should('include', '/store');
    cy.get('[data-testid="store-page"]').should('be.visible');
  });

  it('navigates to Contact page via nav link', () => {
    cy.visit('/');
    cy.get('[data-testid="nav-contact-link"]').click();
    cy.url().should('include', '/contact');
    cy.get('[data-testid="contact-page"]').should('be.visible');
  });

  it('cart icon in header navigates to checkout', () => {
    cy.visit('/');
    cy.get('[data-testid="header-cart-link"]').click();
    cy.url().should('include', '/checkout');
  });

  it('hero View My Work button navigates to projects', () => {
    cy.visit('/');
    cy.get('[data-testid="hero-view-work-button"]').click();
    cy.url().should('include', '/projects');
  });

  it('hero Get In Touch button navigates to contact', () => {
    cy.visit('/');
    cy.get('[data-testid="hero-get-in-touch-button"]').click();
    cy.url().should('include', '/contact');
  });
});

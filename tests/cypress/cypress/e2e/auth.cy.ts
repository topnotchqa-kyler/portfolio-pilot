import { loginPage } from '../pages/LoginPage';

describe('Authentication', () => {
  it('login page displays login form', () => {
    loginPage.visit();
    loginPage.loginForm.should('be.visible');
  });

  it('debug login button logs in and navigates to dashboard', () => {
    loginPage.visit();
    loginPage.debugButton.click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="dashboard-page"]').should('be.visible');
    cy.get('[data-testid="dashboard-heading"]').should('be.visible');
  });

  it('logout button returns user to login page', () => {
    cy.login();
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');
    loginPage.loginForm.should('be.visible');
  });

  it('unauthenticated access to dashboard redirects to login', () => {
    cy.clearCookies();
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('signup link on login page navigates to signup', () => {
    loginPage.visit();
    loginPage.signupLink.click();
    cy.url().should('include', '/signup');
    cy.get('[data-testid="signup-form"]').should('be.visible');
  });

  it('header shows dashboard button when logged in', () => {
    cy.login();
    cy.get('[data-testid="header-dashboard-button"]').should('be.visible');
  });
});

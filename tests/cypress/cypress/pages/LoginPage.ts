export class LoginPage {
  get loginForm() { return cy.get('[data-testid="login-form"]'); }
  get emailInput() { return cy.get('[data-testid="login-email-input"]'); }
  get passwordInput() { return cy.get('[data-testid="login-password-input"]'); }
  get submitButton() { return cy.get('[data-testid="login-submit-button"]'); }
  get debugButton() { return cy.get('[data-testid="login-debug-button"]'); }
  get signupLink() { return cy.get('[data-testid="login-signup-link"]'); }

  visit() {
    cy.visit('/login');
    this.loginForm.should('be.visible');
  }
}

export const loginPage = new LoginPage();

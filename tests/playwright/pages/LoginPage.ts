import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginForm;
  readonly emailInput;
  readonly passwordInput;
  readonly submitButton;
  readonly debugButton;
  readonly signupLink;

  constructor(page: Page) {
    super(page);
    this.loginForm = page.getByTestId('login-form');
    this.emailInput = page.getByTestId('login-email-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.submitButton = page.getByTestId('login-submit-button');
    this.debugButton = page.getByTestId('login-debug-button');
    this.signupLink = page.getByTestId('login-signup-link');
  }

  async goto() {
    await this.navigate('/login');
    await this.loginForm.waitFor();
  }

  async debugLogin() {
    await this.goto();
    await this.debugButton.click();
    await this.page.waitForURL('**/dashboard');
  }
}

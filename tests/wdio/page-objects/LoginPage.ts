import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  get loginForm() { return $('[data-testid="login-form"]'); }
  get emailInput() { return $('[data-testid="login-email-input"]'); }
  get passwordInput() { return $('[data-testid="login-password-input"]'); }
  get submitButton() { return $('[data-testid="login-submit-button"]'); }
  get debugButton() { return $('[data-testid="login-debug-button"]'); }
  get signupLink() { return $('[data-testid="login-signup-link"]'); }

  open() {
    return super.open('/login');
  }

  async debugLogin() {
    await this.open();
    await this.debugButton.waitForClickable();
    await this.debugButton.click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/dashboard'), { timeout: 10000 });
  }
}

export default new LoginPage();

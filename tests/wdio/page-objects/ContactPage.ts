import BasePage from './BasePage.js';

class ContactPage extends BasePage {
  get contactPage() { return $('[data-testid="contact-page"]'); }
  get contactForm() { return $('[data-testid="contact-form"]'); }
  get nameInput() { return $('[data-testid="contact-name-input"]'); }
  get emailInput() { return $('[data-testid="contact-email-input"]'); }
  get messageTextarea() { return $('[data-testid="contact-message-textarea"]'); }
  get sendButton() { return $('[data-testid="contact-send-button"]'); }
  get successMessage() { return $('[data-testid="contact-success-message"]'); }
  get charCount() { return $('[data-testid="contact-message-char-count"]'); }

  open() {
    return super.open('/contact');
  }
}

export default new ContactPage();

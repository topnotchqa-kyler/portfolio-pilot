export class ContactPage {
  get contactForm() { return cy.get('[data-testid="contact-form"]'); }
  get nameInput() { return cy.get('[data-testid="contact-name-input"]'); }
  get emailInput() { return cy.get('[data-testid="contact-email-input"]'); }
  get messageTextarea() { return cy.get('[data-testid="contact-message-textarea"]'); }
  get sendButton() { return cy.get('[data-testid="contact-send-button"]'); }
  get successMessage() { return cy.get('[data-testid="contact-success-message"]'); }
  get charCount() { return cy.get('[data-testid="contact-message-char-count"]'); }

  visit() {
    cy.visit('/contact');
    cy.get('[data-testid="contact-page"]').should('be.visible');
  }
}

export const contactPage = new ContactPage();

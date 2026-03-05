import { contactPage } from '../pages/ContactPage';

describe('Contact Form', () => {
  beforeEach(() => {
    contactPage.visit();
  });

  it('contact page displays the contact form', () => {
    contactPage.contactForm.should('be.visible');
  });

  it('contact info section is visible', () => {
    cy.get('[data-testid="contact-info-email"]').should('be.visible');
    cy.get('[data-testid="contact-info-phone"]').should('be.visible');
    cy.get('[data-testid="contact-info-location"]').should('be.visible');
  });

  it('submitting empty form shows validation errors', () => {
    contactPage.sendButton.click();
    cy.get('p.text-destructive').should('have.length.greaterThan', 0);
  });

  it('name shorter than 2 characters triggers validation error', () => {
    contactPage.nameInput.type('A');
    contactPage.sendButton.click();
    cy.get('p.text-destructive').should('have.length.greaterThan', 0);
  });

  it('invalid email format triggers validation error', () => {
    // Add novalidate to disable native browser email validation so React/zod validation fires
    cy.get('[data-testid="contact-form"]').invoke('attr', 'novalidate', '');
    contactPage.nameInput.type('Test User');
    contactPage.emailInput.type('not-an-email');
    contactPage.sendButton.click();
    cy.get('p.text-destructive').should('have.length.greaterThan', 0);
  });

  it('message shorter than 10 characters triggers validation error', () => {
    contactPage.nameInput.type('Test User');
    contactPage.emailInput.type('test@example.com');
    contactPage.messageTextarea.type('Short');
    contactPage.sendButton.click();
    cy.get('p.text-destructive').should('be.visible');
  });

  it('character counter updates as user types', () => {
    const message = 'Hello, this is a test message';
    contactPage.messageTextarea.type(message);
    contactPage.charCount.should('have.text', `${message.length}/1000`);
  });

  it('character counter turns red above 900 characters', () => {
    // Use cy.type with delay:0 to properly trigger React's onChange handler
    contactPage.messageTextarea.type('a'.repeat(901), { delay: 0 });
    contactPage.charCount.should('have.class', 'text-destructive');
  });
});

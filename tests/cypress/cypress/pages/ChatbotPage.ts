export class ChatbotPage {
  get openButton() { return cy.get('[data-testid="chatbot-open-button"]'); }
  get sheet() { return cy.get('[data-testid="chatbot-sheet"]'); }
  get input() { return cy.get('[data-testid="chatbot-input"]'); }
  get sendButton() { return cy.get('[data-testid="chatbot-send-button"]'); }

  message(index: number) {
    return cy.get(`[data-testid="chatbot-message-${index}"]`);
  }

  visit() {
    cy.visit('/');
  }

  open() {
    this.openButton.click();
    this.sheet.should('be.visible');
  }
}

export const chatbotPage = new ChatbotPage();

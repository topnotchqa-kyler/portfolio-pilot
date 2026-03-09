import { chatbotPage } from '../pages/ChatbotPage';

describe('Chatbot', () => {
  beforeEach(() => {
    chatbotPage.visit();
  });

  it('chatbot open button is visible on the homepage', () => {
    chatbotPage.openButton.should('be.visible');
  });

  it('opening the chatbot shows the chat interface', () => {
    chatbotPage.open();
    chatbotPage.sheet.should('be.visible');
    chatbotPage.input.should('be.visible');
    chatbotPage.sendButton.should('be.visible');
    cy.contains('Chat with Kyra').should('be.visible');
  });

  it('user message appears in chat after submitting', () => {
    chatbotPage.open();
    chatbotPage.input.type('What projects has Kyler worked on?');
    chatbotPage.sendButton.click();
    chatbotPage.message(0).should('be.visible');
    chatbotPage.message(0).should('contain.text', 'What projects has Kyler worked on?');
  });

  it('Kyra responds to a portfolio question', () => {
    chatbotPage.open();
    chatbotPage.input.type('What test frameworks does Kyler work with?');
    chatbotPage.sendButton.click();
    chatbotPage.message(0).should('be.visible');
    chatbotPage.message(1).should('be.visible', { timeout: 30000 });
  });
});

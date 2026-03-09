import BasePage from './BasePage.js';

class ChatbotPage extends BasePage {
  get openButton() { return $('[data-testid="chatbot-open-button"]'); }
  get sheet() { return $('[data-testid="chatbot-sheet"]'); }
  get input() { return $('[data-testid="chatbot-input"]'); }
  get sendButton() { return $('[data-testid="chatbot-send-button"]'); }
  get firstMessage() { return $('[data-testid="chatbot-message-0"]'); }
  get secondMessage() { return $('[data-testid="chatbot-message-1"]'); }
}

export default new ChatbotPage();

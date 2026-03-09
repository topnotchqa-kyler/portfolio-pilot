Feature: Kyra AI Chatbot
  As a visitor
  I want to interact with the Kyra chatbot
  So that I can learn more about Kyler Chavez and his work

  Scenario: Chatbot button is visible on the homepage
    Given I am on the home page
    Then the chatbot open button should be visible

  Scenario: Opening the chatbot shows the chat interface
    Given I am on the home page
    When I click the chatbot open button
    Then the chat panel should be visible
    And the chat input field should be visible
    And the chat send button should be visible

  Scenario: User message appears in chat after submitting
    Given I am on the home page
    When I click the chatbot open button
    And I type "What projects has Kyler worked on?" into the chat input
    And I click the chat send button
    Then the user message should appear in the chat history

  Scenario: Kyra responds to a portfolio question
    Given I am on the home page
    When I click the chatbot open button
    And I type "What test frameworks does Kyler work with?" into the chat input
    And I click the chat send button
    Then the user message should appear in the chat history
    And Kyra's response should appear in the chat history

  Scenario: Kyra declines to answer an off-topic question
    Given I am on the home page
    When I click the chatbot open button
    And I type "What is the capital of France?" into the chat input
    And I click the chat send button
    Then the user message should appear in the chat history
    And Kyra's response should appear in the chat history
    And Kyra's response should not contain "Paris"

Feature: Contact Form
  As a visitor
  I want to send a message via the contact form
  So that I can get in touch with the site owner

  Scenario: Contact page displays the contact form
    Given I am on the contact page
    Then the contact form should be visible

  Scenario: Submitting empty form shows validation errors
    Given I am on the contact page
    When I click the Send Message button
    Then validation error messages should be displayed on the contact form

  Scenario: Character counter updates as user types
    Given I am on the contact page
    When I type "Hello, this is a test message" into the message field
    Then the character counter should reflect the number of characters typed

  Scenario: Name field rejects input shorter than 2 characters
    Given I am on the contact page
    When I enter "A" in the name field
    And I click the Send Message button
    Then a validation error should appear for the name field

Feature: Checkout Process
  As a shopper
  I want to complete the checkout process
  So that I can place my order

  Scenario: Empty cart shows empty cart view
    Given my cart is empty
    When I navigate to the checkout page
    Then the empty cart view should be visible

  Scenario: Checkout page displays heading when cart has items
    Given I have a product in my cart
    When I navigate to the checkout page
    Then the checkout heading should be visible

  Scenario: Place Order without filling form shows validation errors
    Given I have a product in my cart
    And I am on the checkout page
    When I click the Place Order button
    Then validation error messages should be displayed

  Scenario: Complete checkout flow with valid data
    Given I have a product in my cart
    And I am on the checkout page
    When I fill in the checkout form with test data
    And I click the Place Order button
    Then the order confirmation dialog should appear
    When I click the confirmation OK button
    Then I should be on the home page

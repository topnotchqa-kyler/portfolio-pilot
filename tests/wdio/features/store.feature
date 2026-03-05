Feature: Store and Product Browsing
  As a visitor
  I want to browse products in the store
  So that I can find items to purchase

  Scenario: Store page displays product list
    Given I am on the store page
    Then the product list should be visible
    And at least one product card should be displayed

  Scenario: Navigate to product detail page
    Given I am on the store page
    When I click on the first product card
    Then I should be on a product detail page
    And the product name should be visible
    And the product price should be visible
    And the Add to Cart button should be visible

  Scenario: Add product to cart increments cart counter
    Given my cart is empty
    And I am on the product detail page for product "prod_001"
    When I click the Add to Cart button
    Then the cart counter should show "1"

  Scenario: Adding multiple products updates cart counter
    Given my cart is empty
    And I am on the product detail page for product "prod_001"
    When I click the Add to Cart button
    And I navigate to the product detail page for product "prod_002"
    And I click the Add to Cart button
    Then the cart counter should show "2"

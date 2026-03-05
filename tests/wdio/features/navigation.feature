Feature: Site Navigation
  As a visitor
  I want to navigate around the site
  So that I can find the content I am looking for

  Scenario: Header logo navigates to home page
    Given I am on the store page
    When I click the header logo link
    Then I should be on the home page

  Scenario: Navigate to About page via nav link
    Given I am on the home page
    When I click the About nav link
    Then I should be on the about page

  Scenario: Navigate to Projects page via nav link
    Given I am on the home page
    When I click the Projects nav link
    Then I should be on the projects page

  Scenario: Navigate to Blog page via nav link
    Given I am on the home page
    When I click the Blog nav link
    Then I should be on the blog page

  Scenario: Navigate to Store page via nav link
    Given I am on the home page
    When I click the Store nav link
    Then I should be on the store page

  Scenario: Navigate to Contact page via nav link
    Given I am on the home page
    When I click the Contact nav link
    Then I should be on the contact page

  Scenario: Cart icon in header navigates to checkout
    Given I am on the home page
    When I click the cart icon in the header
    Then I should be on the checkout page

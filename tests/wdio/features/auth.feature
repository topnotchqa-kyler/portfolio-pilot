Feature: Authentication
  As a user
  I want to log in and access the dashboard
  So that I can view member-only content

  Scenario: Login page displays login form
    Given I am on the login page
    Then the login form should be visible

  Scenario: Debug login navigates to dashboard
    Given I am on the login page
    When I click the Debug Login button
    Then I should be on the dashboard page
    And the dashboard heading should be visible

  Scenario: Logout returns user to login page
    Given I am logged in
    And I am on the dashboard page
    When I click the Logout button
    Then I should be on the login page

  Scenario: Unauthenticated access to dashboard redirects to login
    Given I am not logged in
    When I navigate to the dashboard page
    Then I should be on the login page

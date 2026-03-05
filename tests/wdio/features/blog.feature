Feature: Blog
  As a visitor
  I want to browse the blog
  So that I can read articles

  Scenario: Blog page displays post list
    Given I am on the blog page
    Then the blog post list should be visible
    And at least one blog post should be displayed

  Scenario: Blog page shows pagination controls
    Given I am on the blog page
    Then the pagination page info should be visible

  Scenario: Navigate to a blog post
    Given I am on the blog page
    When I click on the first blog post
    Then I should be on a blog post page

  Scenario: Pagination next button advances to next page
    Given I am on the blog page
    And there is a next page available
    When I click the pagination Next button
    Then the page info should show page 2

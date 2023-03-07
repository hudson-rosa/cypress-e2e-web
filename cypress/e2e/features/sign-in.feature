@regression @authentication
Feature: Sign In

  @sign-in
  Scenario: Successful sign in to OrangeHRM
    Given I am on OrangeHRM website at Sign In page
    When I sign in using my valid account credentials
    Then my session loads at the Dashboard page

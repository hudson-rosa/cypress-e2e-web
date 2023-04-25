@ui @regression @authentication
Feature: Sign In

  Background: Accessing Sign In page
    Given I am on OrangeHRM website at Sign In page

  @sign-in
  Scenario: Successful sign in to OrangeHRM
    When I sign in using valid account credentials
    Then my session loads at the Dashboard page

  @invalid-sign-in @negative
  Scenario: Successful sign in to OrangeHRM
    When I sign in using invalid account credentials
    Then the message "Invalid credentials" is displayed

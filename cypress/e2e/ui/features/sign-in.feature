@ui @regression @authentication @bdd
Feature: Sign In

  Background: Accessing Sign In page
    Given I am on OrangeHRM website at Sign In page

  @sign-in
  Scenario Outline: Successful sign in to OrangeHRM
    Given that I opened the page with the size of <viewport>
    When I sign in using valid account credentials
    Then my session loads at the Dashboard page
    Examples:
      | viewport  |
      | iphone-xr |
      | 1000, 660 |

  @invalid-sign-in @negative
  Scenario: Unsuccessful signin
    When I sign in using invalid account credentials
    Then the message "Invalid credentials" is displayed

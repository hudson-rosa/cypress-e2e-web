@api @regression @registration
Feature: Swapi characters

  @character
  Scenario: GET Swapi character
    Given I successfully requested to Swapi-people with ID 1
    Then I get the "Luke Skywalker" as reponse

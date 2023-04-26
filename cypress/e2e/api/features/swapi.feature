@api @regression @registration
Feature: Swapi characters

  @character-home-planet
  Scenario: GET Swapi character and its home planet
    Given I successfully requested to Swapi:
      | character id | planet id |
      | 1            | 1         |
    Then I get the character "Luke Skywalker" as response
    And I his planet is "Tatooine"

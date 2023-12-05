import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { peopleRequest, planetsRequest } from "../../requests/api/ro_modules";

function getResponse() {
  return cy.get("@response");
}

Given(/^I successfully requested to Swapi:$/, datatable => {
  datatable.hashes().forEach(item => {
    const characterId = item["character id"];
    const planetId = item["planet id"];
    peopleRequest.getPeopleById.call(this, characterId);
    planetsRequest.getPlanetsById.call(this, planetId);

    getResponse().its("status").should("equal", 200).then(response => {
      cy.log(`People Request for Character ID ${characterId}: ${response.status}`);
    });

    getResponse().its("status").should("equal", 200).then(response => {
      cy.log(`Planets Request for Planet ID ${planetId}: ${response.status}`);
    });
  });
});

Then(/^I get the character "(.*)" as response$/, name => {
  peopleRequest.getPeopleById.call(this, 1);

  getResponse().then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.url).to.eq("https://swapi.dev/api/people/1/");
    cy.wrap(response.body).should("deep.include", {
      name: name,
      homeworld: "https://swapi.dev/api/planets/1/"
    });
  });
});

Then(/^(his|her|its) planet is "(.*)"$/, (characterPronoun, planet) => {
  planetsRequest.getPlanetsById.call(this, 1);

  getResponse().then(response => {
    expect(response.status).to.eq(200);
    cy.wrap(response.body).should("deep.include", {
      name: planet,
      population: "200000",
      rotation_period: "23"
    });
  });
});

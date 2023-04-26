import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(/^I successfully requested to Swapi:$/, datatable => {
  datatable.hashes().forEach(item => {
    cy.getSwapiPeople(item["character id"]).as("swapiPeople").its("status").should("equal", 200);
    cy.getSwapiPlanet(item["planet id"]).as("swapiPlanet").its("status").should("equal", 200);
  });
});

Then(/^I get the character "(.*)" as response$/, name => {
  cy.get("@swapiPeople").then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.url).to.eq("https://swapi.dev/api/people/1/");
    cy.wrap(response.body).should("deep.include", {
      name: name,
      homeworld: "https://swapi.dev/api/planets/1/"
    });
  });
});

Then(/^I his planet is "(.*)"$/, planet => {
  cy.get("@swapiPlanet").then(response => {
    expect(response.status).to.eq(200);
    // expect(response.body.url).to.eq("https://swapi.dev/api/people/1/");
    cy.wrap(response.body).should("deep.include", {
      name: planet,
      population: "200000",
      rotation_period: "23"
    });
  });
});

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let registerResponse;

Given(/^I successfully requested to Swapi-people with ID (.*)$/, id => {
  cy.getSwapiPeople(id).as("swapiPeople").its("status").should("equal", 200);
});

Then(/^I get the "(.*)" as reponse$/, name => {
  cy.get("@swapiPeople").then(response => {
    expect(response.status).to.eq(200);
    expect(response.body.url).to.eq("https://swapi.dev/api/people/1/");
    cy.wrap(response.body).should("deep.include", {
      name: name,
      homeworld: "https://swapi.dev/api/planets/1/"
    });
  });
});

const endpoint = {
  baseUri: Cypress.env("API_BASE_URI"),

  path: {
    planets: "planets/"
  }
};

module.exports = {
  getPlanetsById: function (id = 1) {
    return cy.request({
      method: "GET",
      url: `${endpoint.baseUri}${endpoint.path.planets}${id}`
    }).as('response');
  }

};

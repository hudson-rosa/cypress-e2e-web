const endpoint = {
  baseUri: Cypress.env("API_BASE_URI"),

  path: {
    people: "people/"
  }
};

module.exports = {
  getPeopleById: function (id = 1) {
    return cy.request({
      method: "GET",
      url: `${endpoint.baseUri}${endpoint.path.people}${id}`
    }).as('response');
  }

};

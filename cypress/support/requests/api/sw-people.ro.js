const endpoint = {
  domain: Cypress.env("API_BASE_URI"),
  path: {
    people: "people/",
    query: "",
    param: ""
  }
};

const peopleEndpoint = function(id) {
  return `${endpoint.domain}${endpoint.path.people}${id}`;
};

const getPeopleById = function(id = 1) {
  return cy
    .request({
      method: "GET",
      url: peopleEndpoint(id)
    })
    .as("response");
};

module.exports = {
  peopleEndpoint,
  getPeopleById
};

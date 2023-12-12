const endpoint = {
  domain: Cypress.env("API_BASE_URI"),
  path: {
    planets: "planets/",
    query: "",
    param: ""
  }
};

const planetsEndpoint = function(id) {
  return `${endpoint.domain}${endpoint.path.planets}${id}`;
};

const getPlanetsById = function(id = 1) {
  return cy
    .request({
      method: "GET",
      url: planetsEndpoint(id)
    })
    .as("response");
};

module.exports = {
  planetsEndpoint,
  getPlanetsById
};

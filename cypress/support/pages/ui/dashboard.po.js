const dashboardPO = {
  url: Cypress.env("DEMO_BASE_URL") + "web/index.php/dashboard/index",

  locators: {
    dashboardHeader: "span h6"
  },

  text: {
    dashboardHeader: "Dashboard"
  }
};

class DashboardPage {

  seeUrl() {
    cy.url().should("eq", dashboardPO.url);
  }

  assertDashboardHeader() {
    cy.get(dashboardPO.locators.dashboardHeader).first().should('be.exist');
    cy.get(dashboardPO.locators.dashboardHeader).should("contain", dashboardPO.text.dashboardHeader);
  }

}

module.exports = DashboardPage;

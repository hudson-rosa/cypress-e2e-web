const loginPO = {
  url: Cypress.env("DEMO_BASE_URL") + "web/index.php/auth/login",
  title: "OrangeHRM",

  locators: {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMessage: '.orangehrm-login-error p[class*="alert-content-text"]'
  }
};

module.exports = {
  openPage: function () {
    cy.visit(loginPO.url);
  },

  assertTitle: function (expected = loginPO.title) {
    cy.title().should("eq", expected);
  },

  fillUsername: function (value = "") {
    cy.get(loginPO.locators.usernameField).type(value);
  },

  fillPassword: function (value = "") {
    cy.get(loginPO.locators.passwordField).type(value);
  },

  submitLogin: function () {
    cy.get(loginPO.locators.loginButton).click();
  },

  assertErrorMessage: function (message) {
    cy.get(loginPO.locators.errorMessage).should("contain", message);
  }
};

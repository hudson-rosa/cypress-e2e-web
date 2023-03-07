const loginPO = {
  url: Cypress.env("DEMO_BASE_URL") + "web/index.php/auth/login",
  title: "OrangeHRM",

  locators: {
    usernameField: 'input[name="username"]',
    passwordField: 'input[name="password"]',
    loginButton: 'button[type="submit"]'
  }
};

class LoginPage {
  openPage() {
    cy.visit(loginPO.url);
  }

  assertTitle(expected = loginPO.title) {
    cy.title().should("eq", expected);
  }

  fillUsername(value = "") {
    cy.get(loginPO.locators.usernameField).type(value);
  }

  fillPassword(value = "") {
    cy.get(loginPO.locators.passwordField).type(value);
  }

  submitLogin() {
    cy.get(loginPO.locators.loginButton).click();
  }
}

module.exports = LoginPage;

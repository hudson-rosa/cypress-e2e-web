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

  assertErrorMessage(message) {
    cy.get(loginPO.locators.errorMessage).should("contain", message);
  }
}

module.exports = LoginPage;

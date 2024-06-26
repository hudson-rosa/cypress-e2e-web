import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/ui/login.po.js";
import DashboardPage from "../../pages/ui/dashboard.po.js";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given(`I am on OrangeHRM website at Sign In page`, () => {
  loginPage.openPage();
});

Given(/^that I opened the page with the size of (.*)$/, presetSize => {
  if (presetSize.includes(",")) {
    width = presetSize.split(",")[0];
    height = presetSize.split(",")[1];
    cy.viewport(Number(width), Number(height));
  } else {
    cy.viewport(presetSize);
  }
});

When(/^I sign in using (valid|invalid) account credentials$/, state => {
  const credentials = {
    valid: {
      username: "Admin",
      password: "admin123"
    },
    invalid: {
      username: "AdmIn",
      password: "Admin_123"
    }
  };

  loginPage.fillUsername(credentials[`${state}`].username);
  loginPage.fillPassword(credentials[`${state}`].password);
  loginPage.submitLogin();
});

Then(/^the message "(.*)" is displayed$/, message => {
  loginPage.assertErrorMessage(message);
});

Then(`my session loads at the Dashboard page`, () => {
  dashboardPage.seeUrl();
  dashboardPage.assertDashboardHeader();
});

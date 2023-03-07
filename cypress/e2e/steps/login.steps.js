import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const { LoginPage, DashboardPage } = require("../pages/po_modules/index");

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given(`I am on OrangeHRM website at Sign In page`, () => {
  loginPage.openPage();
});

When(/^I sign in using my (valid|invalid) account credentials$/, credentialsState => {
  loginPage.fillUsername("Admin");
  loginPage.fillPassword("admin123");
  loginPage.submitLogin();
});

Then(`my session loads at the Dashboard page`, () => {
  dashboardPage.seeUrl();
  dashboardPage.assertDashboardHeader();
});

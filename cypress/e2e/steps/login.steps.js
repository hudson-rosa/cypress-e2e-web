import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage, dashboardPage } from "../pages/po_modules";

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

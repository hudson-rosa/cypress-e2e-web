import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage, dashboardPage } from "../../pages/ui/po_modules";

Given(`I am on OrangeHRM website at Sign In page`, () => {
  loginPage.openPage();
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
    },
  }
  
  loginPage.fillUsername(credentials[`${state}`].username);
  loginPage.fillPassword(credentials[`${state}`].password);
  loginPage.submitLogin();

});

Then(/^the message "(.*)" is displayed$/, (message) => {
  loginPage.assertErrorMessage(message);
});

Then(`my session loads at the Dashboard page`, () => {
  dashboardPage.seeUrl();
  dashboardPage.assertDashboardHeader();
});


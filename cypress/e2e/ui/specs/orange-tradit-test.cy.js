import { loginPage, dashboardPage } from "../pages/po_modules";

describe("Orange website", () => {
  it("T1 - OrangeHRM application title", { tags: ['@ui', '@title'] }, () => {
    loginPage.openPage();
    loginPage.assertTitle();
  });

  it("T2 - Fill sign in credentials", { tags: ['@ui', '@sign-in'] }, () => {
    loginPage.openPage();
    loginPage.fillUsername("Admin");
    loginPage.fillPassword("admin123");
    loginPage.submitLogin();

    dashboardPage.seeUrl();
    dashboardPage.assertDashboardHeader();
  });
});

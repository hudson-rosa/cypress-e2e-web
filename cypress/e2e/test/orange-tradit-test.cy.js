const { LoginPage, DashboardPage } = require('../pages/po_modules/index');

const loginPage = new LoginPage;
const dashboardPage = new DashboardPage;

describe("Orange website", () => {
  it("T1 - OrangeHRM application title", () => {
    loginPage.openPage();
    loginPage.assertTitle();
  });

  it("T2 - Fill sign in credentials", () => {
    loginPage.openPage();
    loginPage.fillUsername("Admin");
    loginPage.fillPassword("admin123");
    loginPage.submitLogin();

    dashboardPage.seeUrl();
    dashboardPage.assertDashboardHeader();
  });
});

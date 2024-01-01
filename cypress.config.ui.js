const { defineConfig } = require("cypress");
const { mainConfig } = require("./cypress.config");
const EnvHandler = require("./cypress/fixtures/env-handler");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const dotenv = require("dotenv");
dotenv.config();

const setupEnvVars = () => {
  EnvHandler.selectEnv();
  console.log(process.env.DEMO_BASE_URL);
};

setupEnvVars();

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    chromeWebSecurity: false,
    video: true,
    screenshot: true,
    includeTags: true,
    specPattern: ["cypress/e2e/ui/features/*.feature"],
    
    async setupNodeEvents(on, config) {
      mainConfig.cucumberReporterParameters("cypress/reports/cucumber-reporter", process.env.PROJECT_NAME, process.env.RELEASE_VERSION);
      allureWriter(on, config);
      return mainConfig.setupNodeEvents(on, config);
    },
    
    reporterOptions: mainConfig.mochaParameters("cypress/reports/ui-tests/mochawesome-report")
  },

  env: mainConfig.environmentVariables()
});

const { defineConfig } = require("cypress");
const { mainConfig } = require("./cypress.config");
const EnvHandler = require("./cypress/fixtures/env-handler");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const dotenv = require("dotenv");
dotenv.config();

const setupEnvVars = () => {
  EnvHandler.selectEnv();
  console.log(process.env.API_BASE_URI);
};

setupEnvVars();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    video: false,
    screenshot: false,
    includeTags: true,
    specPattern: ["cypress/e2e/api/features/*.feature"],
    
    async setupNodeEvents(on, config) {
      mainConfig.cucumberReporterParameters("cypress/reports/cucumber-reporter", process.env.SERVICE_NAME, process.env.API_VERSION);
      allureWriter(on, config);
      return mainConfig.setupNodeEvents(on, config);
    },

    reporterOptions: mainConfig.mochaParameters("cypress/reports/api-tests/mochawesome-report")
  },

  env: mainConfig.environmentVariables()
});

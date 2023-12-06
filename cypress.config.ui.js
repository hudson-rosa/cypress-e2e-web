const { defineConfig } = require("cypress");

const { mainConfig } = require("./cypress.config");
const EnvHandler = require("./cypress/fixtures/env-handler");
const dotenv = require("dotenv");
dotenv.config();

const setupEnvVars = () => {
  EnvHandler.selectEnv();
  console.log(process.env.DEMO_BASE_URL);
};

setupEnvVars();

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {    
    chromeWebSecurity: false,
    video: false,
    includeTags: true,
    specPattern: ["cypress/e2e/ui/features/*.feature"],
    
    async setupNodeEvents(on, config) {
      return mainConfig.setupNodeEvents(on, config);
    },

    reporterOptions: mainConfig.mochaParameters("cypress/reports/ui-tests/mochawesome-report")
  },

  env: mainConfig.environmentVariables()
});

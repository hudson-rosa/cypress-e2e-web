const os = require("os");
const { exec } = require("child_process");
const { getOSName } = require("./cypress/support/utils.ts");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const cucumberReport = require("multiple-cucumber-html-reporter");

async function setupNodeEvents(on, config) {
  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)]
  });

  on("file:preprocessor", bundler);
  require("cypress-mochawesome-reporter/plugin")(on);
  await addCucumberPreprocessorPlugin(on, config);

  return config;
}

function environmentVariables() {
  return {
    TEST_ENV: String(process.env.TEST_ENV).toLowerCase(),
    TEST_SUITE: process.env.TEST_SUITE,
    DEMO_BASE_URL: process.env.DEMO_BASE_URL,
    API_BASE_URI: process.env.API_BASE_URI,

    BROWSER: String(process.env.BROWSER).toLowerCase(),
    RETRY: process.env.RETRY === "" ? 0 : process.env.RETRY,

    API_TIME_OUT: process.env.API_TIME_OUT,
    SHORTEST_TIMEOUT: process.env.SHORTEST_TIMEOUT,
    SHORT_TIMEOUT: process.env.SHORT_TIMEOUT,
    MEDIUM_TIMEOUT: process.env.MEDIUM_TIMEOUT,
    LONG_TIMEOUT: process.env.LONG_TIMEOUT,
    LONGEST_TIMEOUT: process.env.LONGEST_TIMEOUT,

    BROWSERSTACK_USERNAME_SECRET: process.env.BROWSERSTACK_USERNAME_SECRET,
    BROWSERSTACK_ACCESS_KEY_SECRET: process.env.BROWSERSTACK_ACCESS_KEY_SECRET,
    BROWSERSTACK_COUNTRY_CODE: process.env.BROWSERSTACK_COUNTRY_CODE,

    allure: true,
    allureResultsPath: "cypress/reports/allure/allure-results",
    allureReuseAfterSpec: true,
    allureClearSkippedTests: false,
    allureAttachRequests: true,
    allureLogGherkin: true,
  };
}

function mochaParameters(reportDir) {
  return {
    autoOpen: true,
    charts: true,
    overwrite: true,
    html: true,
    json: true,
    reportDir: reportDir
  };
}

function cucumberReporterParameters(reportDir, projectName, releaseVersion) {
  cucumberReport.generate({
    jsonDir: `${reportDir}/json`,
    reportPath: `${reportDir}/html`,
    metadata: {
      browser: {
        name: process.env.BROWSER,
        version: process.env.BROWSER_VERSION
      },
      device: "Local test machine",
      platform: {
        name: getOSName(),
        version: `${getOSName()} - ${os.release()}`
      }
    },
    customData: {
      title: "Run Test Details",
      data: [{ label: "Project", value: projectName }, { label: "Release", value: releaseVersion }, { label: "Environment", value: process.env.TEST_ENV.toUpperCase() }]
    }
  });
}

function deleteDirectory(pathToDelete) {
  const commandToRemove = `rm -rf ${pathToDelete}`;
  exec(commandToRemove, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error deleting ${pathToDelete}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr while deleting ${pathToDelete}: ${stderr}`);
      return;
    }
    console.log(`Successfully deleted ${pathToDelete}`);
  });
}

exports.mainConfig = { environmentVariables, mochaParameters, cucumberReporterParameters, setupNodeEvents };

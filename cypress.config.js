const { defineConfig } = require("cypress");
const { configureVisualRegression } = require("cypress-visual-regression");
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  projectId: 'eh5qf3',
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  env: {
    SAUCE_USER: process.env.SAUCE_USER,
    SAUCE_PASSWORD: process.env.SAUCE_PASSWORD,
  },

  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com",

    screenshotsFolder: "./cypress/snapshots/actual",

    expose: {
      visualRegressionType: "regression",

      visualRegressionBaseDirectory: "cypress/snapshots/base",

      visualRegressionDiffDirectory: "cypress/snapshots/diff",
    },

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      configureVisualRegression(on);
    },
  },
});

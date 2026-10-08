const { defineConfig } = require('cypress')
const {
  configureVisualRegression,
} = require('cypress-visual-regression')

module.exports = defineConfig({

  e2e: {

    baseUrl: 'https://www.google.com/',

    screenshotsFolder: './cypress/snapshots/actual',

    expose: {

      visualRegressionType: 'regression',

      visualRegressionBaseDirectory:
        'cypress/snapshots/base',

      visualRegressionDiffDirectory:
        'cypress/snapshots/diff',

    },

    setupNodeEvents(on, config) {

      configureVisualRegression(on)

    },

  },

})

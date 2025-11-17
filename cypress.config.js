const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // base url
    baseUrl: 'https://shop-talk.heex.io/',
    // Add screenshot
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4sgxsg",
  e2e: {
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

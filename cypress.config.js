const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4sgxsg",
  e2e: {
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    loginUsername: "adele",
    loginPassword: "123456",
    env: {
      baseUrl: "https://sqlverifier-staging-08050d656f7a.herokuapp.com",
      loginUsername: "sv_student",
      loginPassword: "trentino456",
    },
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

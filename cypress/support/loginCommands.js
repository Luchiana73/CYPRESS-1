const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
const logoutPageElements = require("../fixtures/pages/logoutPageSelectors.json");

Cypress.Commands.add("loginUser", (userName, password) => {
  cy.visit("/login");
  cy.get(loginPageElements.loginField).type(userName);
  cy.get(loginPageElements.passwordField).type(password);
  cy.get(loginPageElements.loginButton).click();
});

Cypress.Commands.add("logoutUser", () => {
  cy.get(logoutPageElements.accountMenu).click();
  cy.get(logoutPageElements.dropdownMenu)
    .find(logoutPageElements.logoutLink)
    .click();
});

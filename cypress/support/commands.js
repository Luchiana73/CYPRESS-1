// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-iframe";

Cypress.Commands.add("checkElement", (selector) => {
  cy.get(selector).should("exist").and("be.visible");
});
Cypress.Commands.add("clickFirstEl", (selector) => {
  cy.get(selector).click();
});
Cypress.Commands.add("clickSecondEl", (selector1, selector2) => {
  cy.get(selector1).find(selector2).click();
});
Cypress.Commands.add("checkUrl", (endpoint) => {
  cy.url().should("include", endpoint);
});

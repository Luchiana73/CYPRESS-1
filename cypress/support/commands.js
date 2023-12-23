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

Cypress.Commands.add("loginAdmin", () => {
  const username = "admin";
  const password = "admin";
  cy.visit("/login");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.get("#admin-menu").click();
  cy.get(".dropdown-menu")
    .find(".dropdown-item[href='/admin/user-management']")
    .click();
  cy.get(".page-link[aria-label='Last']").click();
});

Cypress.Commands.add("registerUser", (user) => {
  cy.get('input[name="username"]').type(user.username);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="firstPassword"]').type(user.password1);
  cy.get('input[name="secondPassword"]').type(user.password2);
  cy.get("#register-submit").click();
});

Cypress.Commands.add("activateUser", () => {
  cy.get("#activated").check();
  cy.get('button[type="submit"]').click();
  cy.get("#account-menu").click();
  cy.get(".dropdown-menu").find(".dropdown-item[href='/logout']").click();
});

Cypress.Commands.add("activateUserWithRole", (user, role) => {
  cy.get(user).contains("Edit").click();
  cy.get("#activated").check();
  cy.get("#authorities").select(role);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("userLogin", (user) => {
  cy.get('input[name="username"]').type(user.username);
  cy.get('input[name="password"]').type(user.password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("deleteUser", (user) => {
  cy.get(user).contains("Delete").click();
  cy.get(".modal-content").should("be.visible");
  cy.contains("Delete").click();
});

Cypress.Commands.add("changePassword", (oldPassword, newPassword) => {
  cy.get("#account-menu").click();
  cy.get('[data-cy="passwordItem"]').click();
  cy.get('[data-cy="currentPassword"]').type(oldPassword);
  cy.get('[data-cy="newPassword"]').type(newPassword);
  cy.get('[data-cy="confirmPassword"]').type(newPassword);
  cy.contains("Save").click();
});

Cypress.Commands.add("getErrorMessage", (message) => {
  cy.get(".invalid-feedback").should("be.visible").and("contain", message);
});
Cypress.Commands.add("failedLogin", (message) => {
  cy.get(`[data-cy="loginError"]`).should("be.visible").and("contain", message);
});

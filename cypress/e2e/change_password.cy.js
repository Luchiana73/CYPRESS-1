import { faker } from "@faker-js/faker";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");

describe("Change password", () => {
  let oldPassword = "sassolungo£$%";
  let newPassword = faker.internet.password(10);
  before(() => {
    cy.visit("/account/register");
    cy.registerUser({
      username: "anton",
      email: "anton.student@test.com",
      password1: oldPassword,
      password2: oldPassword,
    });
    cy.loginAdmin();
    cy.get("#anton").contains("Edit").click();
    cy.activateUser();
  });

  after(() => {
    //logout
    cy.logoutUser();
    //login admin
    cy.loginAdmin();
    //delete
    cy.deleteUser("#anton");
  });

  it("User can login only with new password", () => {
    //user login
    cy.loginUser("anton", oldPassword);
    //change password
    cy.changePassword(oldPassword, newPassword);
    cy.log(newPassword);
    //logout
    cy.logoutUser();
    //login with old password
    cy.loginUser("anton", oldPassword);
    cy.contains("Failed to sign in!").should("exist");
    //login with new password
    cy.get(loginPageElements.passwordField).clear().type(newPassword);
    cy.get(loginPageElements.loginButton).click();
    //change password
    cy.changePassword(newPassword, oldPassword);
  });
});

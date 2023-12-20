import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";
import { LogoutPage } from "../pages/logoutPage";

describe("Change password", () => {
  let loginPage = new LoginPage();
  let logoutPage = new LogoutPage();
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
    logoutPage.logout();
    //login admin
    cy.loginAdmin();
    //delete
    cy.deleteUser("#anton");
  });

  it("User can login only with new password", () => {
    //user login
    cy.visit("/login");
    loginPage.login("anton", oldPassword);
    //change password
    cy.changePassword(oldPassword, newPassword);
    cy.log(newPassword);
    //logout
    logoutPage.logout();
    //login with old password
    cy.visit("/login");
    loginPage.login("anton", oldPassword);
    cy.contains("Failed to sign in!").should("exist");
    //login with new password
    loginPage.elements.passwordField().clear().type(newPassword);
    loginPage.elements.loginButton().click();
    //change password
    cy.changePassword(newPassword, oldPassword);
  });
});

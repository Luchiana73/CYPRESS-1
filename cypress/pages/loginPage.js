export class LoginPage {
  elements = {
    loginField: () => cy.get('input[name="username"]'),
    passwordField: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
  };

  login(login, password) {
    this.elements.loginField().type(login);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }
}

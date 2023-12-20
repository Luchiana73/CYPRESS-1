export class LogoutPage {
  elements = {
    accountMenu: () => cy.get("#account-menu"),
    logoutLink: () =>
      cy.get(".dropdown-menu").find(".dropdown-item[href='/logout']"),
  };

  logout() {
    this.elements.accountMenu().click();
    this.elements.logoutLink().click();
  }
}

describe("Test Login Page", () => {
  let loginData;

  before(() => {
    cy.fixture("loginData.json").then((data) => {
      loginData = data;
      const user = loginData.data1;
      cy.visit("/account/register");
      cy.registerUser(user);
      cy.loginAdmin().then(() => {
        cy.get(`#${user.username}`).contains("Edit").click();
      });
      cy.activateUser();
    });
  });

  after(() => {
    const user = loginData.data1;
    cy.loginAdmin().then(() => {
      cy.deleteUser(`#${user.username}`);
    });
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  it("Successful login", () => {
    const login = loginData.data2;
    cy.userLogin(login);
    cy.url().should("include", "/?page=1&sort=id,asc");
  });

  it("Attemt to login with invalid username", () => {
    const login = loginData.data3;
    cy.userLogin(login);
    cy.failedLogin("Failed to sign in!");
  });

  it("Attemt to login with invalid password", () => {
    const login = loginData.data4;
    cy.userLogin(login);
    cy.failedLogin("Failed to sign in!");
  });

  it("Attemt to login with empty email field", () => {
    const login = loginData.data5;
    cy.userLogin(login);
    cy.failedLogin("Failed to sign in!");
  });

  it("Reset fogotten password", () => {
    const login = loginData.data1;
    cy.get('input[name="username"]').type(login.username);
    cy.get("[data-cy='forgetYourPasswordSelector']").click();
    cy.get('input[name="email"]').type(login.email);
    cy.get('[data-cy="submit"]').click();
    cy.get(".Toastify__toast-body").should("be.visible");
  });

  it("Register new account link", () => {
    cy.contains("Register a new account").click();
    cy.url().should("include", "/account/register");
  });

  it("Check cancel button", () => {
    cy.contains("Cancel").click();
    cy.url().should("include", "/?page=1&sort=id,asc");
  });
});

describe("Test Registration page", () => {
  let users;
  beforeEach(() => {
    cy.fixture("users.json").then((allUsers) => {
      users = allUsers;
    });
    cy.visit("/account/register");
  });

  it("Successful registration of a new user", () => {
    const user = users[0];
    cy.registerUser(user);
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("exist").and("be.visible");
    });
  });

  it("Attempt to register a user with the same data", () => {
    const user = users[0];
    cy.registerUser(user);
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("exist").and("be.visible");
      cy.get(`#${user.username}`).should("have.length", 1);
    });
  });

  it("Attempt to register new user with empty username field", () => {
    const user = users[1];
    cy.registerUser(user);
    cy.getErrorMessage("Your username is invalid");
    cy.loginAdmin().then(() => {
      cy.contains(`${user.email}`).should("not.exist");
    });
  });

  it("Attempt to register new user with non valid email", () => {
    const user = users[2];
    cy.registerUser(user);
    cy.getErrorMessage("Your email is invalid");
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("not.exist");
    });
  });

  it("Attempt to register new user with empty email field", () => {
    const user = users[3];
    cy.registerUser(user);
    cy.getErrorMessage("Your email is required");
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("not.exist");
    });
  });

  it("New password confirmation field matches New password field", () => {
    const user = users[4];
    cy.registerUser(user);
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("exist").and("be.visible");
    });
  });

  it("New password confirmation field and New password field do not match", () => {
    const user = users[5];
    cy.registerUser(user);
    cy.getErrorMessage("The password and its confirmation do not match");
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("not.exist");
    });
  });

  it("New user registration with a four-character password", () => {
    const user = users[6];
    cy.registerUser(user);
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("exist").and("be.visible");
    });
  });

  it("Attempt to register new user with with a three-character password", () => {
    const user = users[7];
    cy.registerUser(user);
    cy.getErrorMessage("required to be at least 4 characters");
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("not.exist");
    });
  });

  it("Attempt to register new user with invalid characters in the Username field", () => {
    const user = users[8];
    cy.registerUser(user);
    cy.getErrorMessage("Your username is invalid");
    cy.loginAdmin().then(() => {
      cy.contains(`#${user.username}`).should("not.exist");
    });
  });

  it("Attempt to register new user with cyrillic letters in the Username field", () => {
    const user = users[9];
    cy.registerUser(user);
    cy.getErrorMessage("Your username is invalid");
    cy.loginAdmin().then(() => {
      cy.get(`#${user.username}`).should("not.exist");
    });
  });
});

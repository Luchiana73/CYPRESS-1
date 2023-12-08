import "cypress-iframe";

beforeEach(() => {
  cy.visit("/login");
  cy.get('input[name="username"]').type("adele");
  cy.get('input[name="password"]').type("123456");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/?page=1&sort=id,asc");
});

describe("Check all links working after user student login", () => {
  it("Check Refresh button on the task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu")
      .find(".dropdown-item[href='/task']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/task");
    cy.get("button.me-2").should("exist").and("be.visible");
  });

  it("Check the Save button on the Create a new task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/task']").click();
    cy.get(".jh-create-entity[href='/task/new']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/task/new");
    cy.get("#save-entity").should("exist").and("be.visible");
  });

  it("Check the Edit button on the View task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/task']").click();
    cy.get(".btn-info[href='/task/1103']").click();
    cy.url().should("include", "/task/1103");
    cy.get(".btn-primary[href='/task/1103/edit']")
      .should("exist")
      .and("be.visible");
  });

  it("Check the Title field on the Edit task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/task']").click();
    cy.get(".btn-info[href='/task/1103']").click();
    cy.get(".btn-primary[href='/task/1103/edit']").click();
    cy.url().should("include", "/task/1103/edit");
    cy.get("#task-title").should("exist").and("be.visible");
  });

  it("Check Create button on the User task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/user-task']").click();
    cy.url().should("include", "/user-task");
    cy.get(".jh-create-entity[href='/user-task/new']")
      .should("exist")
      .and("be.visible");
  });

  it("Check message No user tasks found on the User task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/user-task']").click();
    cy.get(".alert.alert-warning").should("exist").and("be.visible");
  });

  it("Check the User field on the Create a User task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/user-task']").click();
    cy.get("a.btn").should("exist").and("be.visible").click();
    cy.url().should("include", "/user-task/new");
    cy.get("#user-task-user").should("exist").and("be.visible");
  });

  it("Check the Save button on the Create a user task page", () => {
    cy.get("#entity-menu").click();
    cy.get(".dropdown-menu").find(".dropdown-item[href='/user-task']").click();
    cy.get("#jh-create-entity").should("exist").and("be.visible").click();
    cy.url().should("include", "/user-task/new");
    cy.get("#save-entity").should("exist").and("be.visible");
  });

  it("Check Select field on the Swagger page", () => {
    cy.get("#docs-menu").click();
    cy.get(".dropdown-menu")
      .find(".dropdown-item[href='/docs/docs']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/docs/docs");
    cy.iframe("[data-cy='swagger-frame']").within(() => {
      cy.get("#select").should("be.visible");
    });
  });

  it("Check GET method command on the Swagger page", () => {
    cy.get("#docs-menu").click();
    cy.get(".dropdown-menu")
      .find(".dropdown-item[href='/docs/docs']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/docs/docs");
    cy.iframe("[data-cy='swagger-frame']").within(() => {
      cy.get("#operations-user-task-resource-getUserTask")
        .should("exist")
        .and("be.visible");
    });
  });

  it("Check Language field on the Settings page", () => {
    cy.get("#account-menu").click();
    cy.get(".dropdown-menu")
      .find(".dropdown-item[href='/account/settings']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/account/settings");
    cy.get("#langKey").should("exist").and("be.visible");
  });

  it("Check Save button on the Password page", () => {
    cy.get("#account-menu").click();
    cy.get(".dropdown-menu")
      .find(".dropdown-item[href='/account/password']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.url().should("include", "/account/password");
    cy.get(".btn-success").should("exist").and("be.visible");
  });
});

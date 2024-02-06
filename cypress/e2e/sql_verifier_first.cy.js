const selector = require("../fixtures/verifierSelector.json");
const element = require("../fixtures/verifierElement.json");

describe.skip("Check all links working after user student login", () => {
  const menu = ".dropdown-menu";
  const item = ".dropdown-item";
  const entity = "#entity-menu";
  const docs = "#docs-menu";
  const account = "#account-menu";
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("adele");
    cy.get('input[name="password"]').type("123456");
    cy.clickFirstEl(selector[0]);
    cy.checkUrl("/?page=1&sort=id,asc");
  });
  it("Check Refresh button on the task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/task']`);
    cy.checkUrl("/task");
    cy.checkElement(element[0]);
  });

  it("Check the Save button on the Create a new task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/task']`);
    cy.clickFirstEl(selector[1]);
    cy.checkUrl("/task/new");
    cy.checkElement(element[1]);
  });

  it("Check the Edit button on the View task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/task']`);
    cy.clickFirstEl(selector[2]);
    cy.checkElement(element[2]);
  });

  it("Check the Title field on the Edit task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/task']`);
    cy.clickFirstEl(selector[2]);
    cy.clickFirstEl(selector[3]);
    cy.checkElement(element[3]);
  });

  it("Check Create button on the User task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/user-task']`);
    cy.checkUrl("/user-task");
    cy.checkElement(element[4]);
  });

  it("Check alert No User Tasks found on the User task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/user-task']`);
    cy.checkUrl("/user-task");
    cy.checkElement(element[5]);
  });

  it("Check the User field on the Create a User task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/user-task']`);
    cy.clickFirstEl(selector[4]);
    cy.checkUrl("/user-task/new");
    cy.checkElement(element[6]);
  });

  it("Check the Save button on the Create a user task page", () => {
    cy.clickFirstEl(entity);
    cy.clickSecondEl(menu, `${item}[href='/user-task']`);
    cy.clickFirstEl(selector[5]);
    cy.checkUrl("/user-task/new");
    cy.checkElement(element[7]);
  });

  it("Check Select field on the Swagger page", () => {
    cy.clickFirstEl(docs);
    cy.clickSecondEl(menu, `${item}[href='/docs/docs']`);
    cy.checkUrl("/docs/docs");
    cy.iframe("[data-cy='swagger-frame']").within(() => {
      cy.checkElement(element[8]);
    });
  });

  it("Check GET method command on the Swagger page", () => {
    cy.clickFirstEl(docs);
    cy.clickSecondEl(menu, `${item}[href='/docs/docs']`);
    cy.checkUrl("/docs/docs");
    cy.iframe("[data-cy='swagger-frame']").within(() => {
      cy.checkElement(element[9]);
    });
  });

  it("Check Language field on the Settings page", () => {
    cy.clickFirstEl(account);
    cy.clickSecondEl(menu, `${item}[href='/account/settings']`);
    cy.checkUrl("/account/settings");
    cy.checkElement(element[10]);
  });

  it("Check Save button on the Password page", () => {
    cy.clickFirstEl(account);
    cy.clickSecondEl(menu, `${item}[href='/account/password']`);
    cy.checkUrl("/account/password");
    cy.checkElement(element[11]);
  });
});

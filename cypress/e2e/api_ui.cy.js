const users = require("../fixtures/usersApiTest.json");
import { LogoutPage } from "../pages/logoutPage";
import { faker } from "@faker-js/faker";

describe("Manage tasks - API, UI", () => {
  let logoutPage = new LogoutPage();
  let taskId;
  let userTaskId;
  let adminToken;
  let studentToken;
  let studentId;
  let taskTitle;
  let taskText;
  let taskAnswer;

  before(() => {
    users.forEach((user) => {
      cy.visit("/account/register");
      cy.registerUser(user);
      cy.loginAdmin();
      cy.activateUserWithRole(`#${user.username}`, user.role);
      logoutPage.logout();
      cy.request({
        method: "POST",
        url: "/api/authenticate",
        body: {
          username: user.username,
          password: user.password1,
          rememberMe: true,
        },
      }).then((response) => {
        if (user.role === "ROLE_ADMIN") {
          adminToken = `Bearer ${response.body.id_token}`;
          cy.log(adminToken);
        } else {
          studentToken = `Bearer ${response.body.id_token}`;
          cy.log(studentToken);
        }
      });
    });
  });

  after(() => {
    cy.loginAdmin().then(() => {
      cy.deleteUser(`#${users[0].username}`);
      cy.deleteUser(`#${users[1].username}`);
    });
  });

  it("Get student ID", () => {
    cy.request({
      method: "GET",
      headers: {
        authorization: adminToken,
      },
      url: `/api/admin/users/${encodeURIComponent(users[1].username)}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log(response.body.id);
      studentId = response.body.id;
    });
  });

  it("Create new task with valid token", () => {
    taskTitle = faker.lorem.word();
    taskText = faker.lorem.words();
    taskAnswer = faker.lorem.sentence();
    cy.request({
      method: "POST",
      headers: {
        authorization: adminToken,
      },
      url: "/api/tasks",
      body: {
        text: taskText,
        answer: taskAnswer,
        title: taskTitle,
      },
    }).then((response) => {
      taskId = response.body.id;
      cy.log(taskTitle, taskText, taskAnswer);
      expect(response.status).to.be.oneOf([201, 202]);
      expect(response.statusText).to.equal("Created");
    });
  });

  it("Create new task with non valid token", () => {
    taskTitle = faker.lorem.word();
    taskText = faker.lorem.words();
    taskAnswer = faker.lorem.sentence();
    cy.request({
      method: "POST",
      headers: {
        authorization: studentToken,
      },
      url: "/api/tasks",
      body: {
        text: taskText,
        answer: taskAnswer,
        title: taskTitle,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
      expect(response.statusText).to.be.oneOf(["Unauthorized", "Forbidden"]);
    });
  });

  it("Update task with PUT metod", () => {
    cy.request({
      method: "PUT",
      headers: {
        authorization: adminToken,
      },
      url: `/api/tasks/${taskId}`,
      body: {
        id: taskId,
        text: taskText,
        answer: taskAnswer,
        title: taskTitle,
      },
    }).then((response) => {
      cy.log(taskTitle, taskText, taskAnswer);
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Update task with PATCH metod", () => {
    taskText = faker.lorem.words();
    cy.request({
      method: "PATCH",
      headers: {
        authorization: adminToken,
      },
      url: `/api/tasks/${taskId}`,
      body: {
        id: taskId,
        text: taskText,
      },
    }).then((response) => {
      cy.log(taskTitle, taskText, taskAnswer);
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Update task without specifying the task ID in the request body", () => {
    cy.request({
      method: "PATCH",
      headers: {
        authorization: adminToken,
      },
      url: `/api/tasks/${taskId}`,
      body: {
        text: taskText,
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(taskTitle, taskText, taskAnswer);
      expect(response.status).to.equal(400);
      expect(response.statusText).to.equal("Bad Request");
    });
  });

  it("Get task by ID", () => {
    cy.request({
      method: "GET",
      headers: {
        authorization: adminToken,
      },
      url: `/api/tasks/${taskId}`,
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Get all tasks", () => {
    cy.request({
      method: "GET",
      headers: {
        authorization: studentToken,
      },
      url: "/api/tasks",
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Create new user-task", () => {
    cy.request({
      method: "POST",
      headers: {
        authorization: adminToken,
      },
      url: "/api/user-tasks",
      body: {
        isSolved: false,
        user: {
          id: studentId,
        },
        task: {
          id: taskId,
        },
      },
    }).then((response) => {
      cy.log(response.body.id);
      userTaskId = response.body.id;
      expect(response.status).to.be.oneOf([201, 202]);
      expect(response.statusText).to.equal("Created");
    });
  });

  it("Update user-task", () => {
    cy.request({
      method: "PATCH",
      headers: {
        authorization: adminToken,
      },
      url: `/api/user-tasks/${userTaskId}`,
      body: {
        id: userTaskId,
        isSolved: true,
        user: {
          id: studentId,
        },
        task: {
          id: taskId,
        },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Get user-task by ID", () => {
    cy.request({
      method: "GET",
      headers: {
        authorization: studentToken,
      },
      url: `/api/user-tasks/${userTaskId}`,
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
    });
  });

  it("Delete user-task", () => {
    cy.request({
      method: "DELETE",
      headers: {
        authorization: adminToken,
      },
      url: `/api/user-tasks/${userTaskId}`,
    }).then((response) => {
      expect(response.status).to.equal(204);
      expect(response.statusText).to.equal("No Content");
    });
  });

  it("Delete task", () => {
    cy.request({
      method: "DELETE",
      headers: {
        authorization: adminToken,
      },
      url: `/api/tasks/${taskId}`,
    }).then((response) => {
      expect(response.status).to.equal(204);
      expect(response.statusText).to.equal("No Content");
    });
  });
});

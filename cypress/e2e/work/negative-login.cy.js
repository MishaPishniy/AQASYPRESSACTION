import LoginPage from "../../pages/LoginPage.js";

describe("SauceDemo: негативні сценарії входу", {
  baseUrl: "https://www.saucedemo.com",
  testIsolation: true,
}, () => {
  const loginPage = new LoginPage();

  const expectLoginError = (message, sessionUsername = null) => {
    loginPage.errorMesagge().should("be.visible").and("have.text", message);
    cy.location("pathname").should("eq", "/");
    cy.get(loginPage.loginButton).should("be.visible");
    cy.get('[data-test="inventory-container"]').should("not.exist");
    if (sessionUsername === null) {
      cy.getCookie("session-username").should("be.null");
    } else {
      cy.getCookie("session-username").should("have.property", "value", sessionUsername);
    }
  };

  beforeEach(() => {
    cy.fixture("user").as("user");
    loginPage.visit();
  });

  it("Не дозволяє вхід із порожніми полями", () => {
    loginPage.clickLoginButton();

    expectLoginError("Epic sadface: Username is required");
  });

  it("Не дозволяє вхід без імені користувача", () => {
    cy.get("@user").then(({ standardUser }) => {
      cy.get(loginPage.userpasswordInput).typeSecret(standardUser.password);
    });
    loginPage.clickLoginButton();

    expectLoginError("Epic sadface: Username is required");
  });

  it("Не дозволяє вхід без пароля", () => {
    cy.get("@user").then(({ standardUser }) => {
      loginPage.enterUsername(standardUser.username);
    });
    loginPage.clickLoginButton();

    expectLoginError("Epic sadface: Password is required");
  });

  it("Відхиляє неіснуючого користувача з правильним паролем", () => {
    cy.get("@user").then(({ standardUser }) => {
      loginPage.enterUsername(`${standardUser.username}_unknown`);
      cy.get(loginPage.userpasswordInput).typeSecret(standardUser.password);
    });
    loginPage.clickLoginButton();

    expectLoginError(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("Відхиляє неправильний пароль наявного користувача", () => {
    cy.get("@user").then(({ standardUser }) => {
      loginPage.enterUsername(standardUser.username);
      cy.get(loginPage.userpasswordInput).typeSecret(`${standardUser.password}_invalid`);
    });
    loginPage.clickLoginButton();

    expectLoginError(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("Відхиляє одночасно неправильні ім’я користувача та пароль", () => {
    cy.get("@user").then(({ standardUser }) => {
      loginPage.enterUsername(`${standardUser.username}_unknown`);
      cy.get(loginPage.userpasswordInput).typeSecret(`${standardUser.password}_invalid`);
    });
    loginPage.clickLoginButton();

    expectLoginError(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("Не дозволяє вхід заблокованому користувачу", () => {
    cy.get("@user").then(({ lockedUser }) => {
      loginPage.enterUsername(lockedUser.username);
      cy.get(loginPage.userpasswordInput).typeSecret(lockedUser.password);
      loginPage.clickLoginButton();

      // SauceDemo sets this cookie before checking whether the user is locked.
      expectLoginError(
        "Epic sadface: Sorry, this user has been locked out.",
        lockedUser.username,
      );

      // The host returns 404 for this SPA route; the app still enforces access.
      cy.visit("/inventory.html", { failOnStatusCode: false });
      expectLoginError(
        "Epic sadface: You can only access '/inventory.html' when you are logged in.",
        lockedUser.username,
      );
    });
  });

  it("Не дозволяє відкрити каталог без авторизації", () => {
    // Allow the host's 404 response to render the SPA and verify its route guard.
    cy.visit("/inventory.html", { failOnStatusCode: false });

    expectLoginError(
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
    );
  });
});

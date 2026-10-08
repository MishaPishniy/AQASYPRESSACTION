describe("Login", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("user");
  });

  it("Login with fixture", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("@user").then((user) => {
      cy.get('[data-test="username"]').type(user.standardUser.username);
      cy.get('[data-test="password"]').type(user.standardUser.password);
      cy.get('[data-test="login-button"]').click();
    });
  });

  it("Login with fixture lock user", () => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("@user").then((user) => {
      cy.get('[data-test="username"]').type(user.lockedUser.username);
      cy.get('[data-test="password"]').type(user.lockedUser.password);
      cy.get('[data-test="login-button"]').click();
    });
  });

  it("Login with fixture example for api", () => {
    cy.fixture("newUser").then((user) => {
      cy.request({
        method: "POST",
        url: "/api/users",
        body: user,
      });
      
    });
  });
});

describe("Login", () => {
  it("Login with fixture", () => {
    cy.fixture("user.json").then((user) => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type(user.standardUser.username);
    cy.get('[data-test="password"]').type(user.standardUser.password);
    cy.get('[data-test="login-button"]').click();
    })
  });


   it("Login with fixture lock user", () => {
    cy.fixture("user.json").then((user) => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type(user.lockedUser.username);
    cy.get('[data-test="password"]').type(user.lockedUser.password);
    cy.get('[data-test="login-button"]').click();
    })
  });
});

describe.skip("example to saucedemo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login", () => {
    cy.get('[data-test="username"]').click();

    cy.focused().type("standard_user");
  });
});

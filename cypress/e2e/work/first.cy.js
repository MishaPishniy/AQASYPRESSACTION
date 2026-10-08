describe.skip("example to saucedemo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Login", () => {
    cy.get('[data-test="username"]').should("be.visible");
    cy.get('[placeholder="Username"]').type("standard_user");
    cy.get("#password").should("be.visible");
    cy.get("#password").type("secret_sauce");
    cy.get("input").should("be.visible");
    cy.contains("Swag Labs").should("be.visible");
    cy.get('input[name="login-button"]').click();
    cy.get(".inventory_list").should("be.visible");
    cy.get(".inventory_item").first().should("be.visible");
    cy.get(".inventory_item").should("be.visible").first().click();
    cy.get(".inventory_item").first().should("be.visible");
    cy.get(".inventory_item").should("be.visible").last();
    cy.get(".inventory_item").should("be.visible").eq(3);
    cy.get(".inventory_item").filter(":visible").should("have.length", 6);
    cy.get("button").filter(".btn_inventory").should("have.length", 6);
    cy.get("button")
      .filter('[data-test^="add-to-cart"]')
      .should("have.length", 6);
    cy.get(".inventory_item").not(":first").should("have.length", 5);
    cy.get(".inventory_item")
      .filter(':contains("Sauce Labs Backpack")')
      .should("have.length", 1);
    cy.get(".inventory_item_name").each(($name) => {
      cy.wrap($name).should("be.visible").and("not.have.text", "");
    });
  });

  it("Login locked_out_user", () => {
    cy.get('[data-test="username"]').should("be.visible");
    cy.get('[placeholder="Username"]').type("standard_user");
    cy.get("#password").type("locked_out_user");
    cy.get('input[name="login-button"]').click();
    cy.get(".error-message-container.error").should("be.visible");
    cy.get(".error-message-container.error").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service",
    );
    cy.get("#password").clear();
    cy.get('[data-test="username"]').clear();
    cy.get('[placeholder="Username"]').type("locked_out_user");
    cy.get("#password").type("secret_sauce");
    cy.get('input[name="login-button"]').click();
    cy.get(".error-message-container.error").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});

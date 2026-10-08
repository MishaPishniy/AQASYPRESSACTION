describe.skip("example to saucedemo", () => {
  before(() => {
    cy.log("Виконується один раз перед усіма тестами");
  });
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').should("be.visible");
    cy.get('[placeholder="Username"]').type("standard_user");
    cy.get("#password").should("be.visible");
    cy.get("#password")
      .type("secret_sauce")
      .should("have.value", "standard_user");
    cy.get("#button").should("be.visible").should("be.enabled").click();
    cy.get('input[name="login-button"]').click({ force: true });
    cy.get(".loader").should("not.exist");
    cy.get('input[name="login-button"]').click({ force: true });
    cy.get(".title").should("have.text", "Products");
    cy.get('[data-test="error"]').should("contain.text", "Username");
    cy.get(".shopping_cart_link").should("exist");
    cy.get('[data-test="username"]').should(
      "have.attr",
      "placeholder",
      "Username",
    );
    cy.get(".shopping_cart_link")
      .should("not.have.class", "disabled")
      .and("have.attr", "placeholder", "Username");
  });
  it("Товари", () => {
    cy.get(".inventory_item").should("exist");
  });

  it("Товари1", () => {
    cy.get(".inventory_item").should("exist");
  });

  it("Товари2 find", () => {
    cy.get(".inventory_item").find(".inventory_item_name");
  });

  it("Товари2 contains", () => {
    cy.contains("Sauce Labs Backpack");
    cy.contains(".inventory_item_name", "Sauce Labs Backpack");
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .find("button")
      .click();
    cy.contains(".inventory_item", "Sauce Labs Backpack")
      .contains("button", "Remove")
      .click();
    cy.contains("Sauce Labs").should("be.visible");
    cy.contains(".inventory_item_name", /^Sauce Labs Backpack$/);
  });

  it("Товари2 children", () => {
    cy.get(".inventory_list").children(".inventory_item");
    // cy.get(".inventory_list").children(".inventory_item_name");
  });

  it("Товари2 closest", () => {
    cy.get(".inventory_item_name")
      .closest(".inventory_item")
      .should("be.visible");
    cy.contains(".inventory_item_name", "Sauce Labs Backpack")
      .closest(".inventory_item")
      .find("button")
      .click();
  });

  it("Товари2 within", () => {
    cy.contains(".inventory_item", "Sauce Labs Backpack").within(() => {
      cy.get(".inventory_item_name").should("have.text", "Sauce Labs Backpack");

      cy.get(".inventory_item_price").should("contain", "$");

      cy.get("button").click();
    });

    cy.get(".inventory_item").eq(0).find("button").click();

    cy.get(".inventory_item").eq(0).find("button").as("addCard");
    cy.get("@addCard").click();
  });

  it("Товари2 selector", () => {
    cy.go("back");
    cy.go("forward");
    cy.reload();
    cy.get("[data-test='product-sort-container']").select("za") /
      cy.get("[data-test='product-sort-container']").dbclikc();
    cy.get("[data-test='product-sort-container']").scrollIntoView();
    cy.get("[data-test='product-sort-container']").submit();
    // cy.get(".inventory_list").children(".inventory_item_name");
  });

  afterEach(() => {
    cy.log("Тест завершено");
  });
  after(() => {
    cy.log("Усі тести завершено");
  });
});

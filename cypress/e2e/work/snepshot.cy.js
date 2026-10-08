import LoginPage from "../../pages/LoginPage.js";

describe("example to saucedemo", () => {
  const loginPage = new LoginPage();
  beforeEach(() => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");
  });
  it("LOgin POM", () => {
   
    cy.get(".title").should("have.text", "Products");
    cy.compareSnapshot('inventory-page')
  });

});




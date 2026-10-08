import LoginPage from "../../pages/LoginPage.js";
const loginPage = new LoginPage();

it.skip("LOgin POM", () => {
  loginPage.visit();
  loginPage.login("standard_user", "secret_sauce");
  cy.get(".title").should("have.text", "Products");
  cy.screenshot("products-page");
  cy.get(".inventory_list").screenshot("first-product");
});

import LoginPage from "../../pages/LoginPage.js";

describe.skip("example to saucedemo", () => {
  const loginPage = new LoginPage();
  beforeEach(() => {
    loginPage.visit();
  });
  it("LOgin POM", () => {
    loginPage.login("standard_user", "secret_sauce");
    cy.get(".title").should("have.text", "Products");
  });

  it("LOgin POM  error", () => {
    loginPage.enterUsername("standard");
    loginPage.enterUserpassword("secret_sauce");
    loginPage.clickLoginButton();
    loginPage.errorMesagge().should("be.visible");
    loginPage
      .errorMesagge()
      .should(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service",
      );
  });

  it("LOgin POM error 2", () => {
    loginPage.enterUsername("locked_out_user");
    loginPage.enterUserpassword("secret_sauce");
    loginPage.clickLoginButton();
    loginPage.errorMesagge().should("be.visible");
    loginPage
      .errorMesagge()
      .should(
        "have.text",
        "Epic sadface: Sorry, this user has been locked out.",
      );
  });
});

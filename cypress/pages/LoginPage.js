class LoginPage {
  usernameInput = '[data-test="username"]';
  userpasswordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorMessage = '[data-test="error"]';

  visit() {
    cy.visit("/");
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  enterUserpassword(userpassword) {
    cy.get(this.userpasswordInput).type(userpassword);
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }


  login(username,userpassword){
    this.enterUsername(username)
    this.enterUserpassword(userpassword)
    this.clickLoginButton()
  }

  errorMesagge(){
    return cy.get(this.errorMessage)
  }
}
export default LoginPage
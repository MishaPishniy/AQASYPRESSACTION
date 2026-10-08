class LoginPage {
  usernameInput = '[data-test="username"]';
  userpasswordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorMessage = '[data-test="error"]';

  visit() {
    return cy.visit("/");
  }

  enterUsername(username) {
    return cy.get(this.usernameInput).typeSecret(username);
  }

  enterUserpassword(userpassword) {
    return cy.get(this.userpasswordInput).typeSecret(userpassword);
  }

  clickLoginButton() {
    return cy.get(this.loginButton).click();
  }


  login(username,userpassword){
    this.enterUsername(username)
    this.enterUserpassword(userpassword)
    return this.clickLoginButton()
  }

  errorMesagge(){
    return cy.get(this.errorMessage)
  }
}
export default LoginPage

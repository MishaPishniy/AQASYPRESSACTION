import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');

  cy.get('[data-test="username"]').type(username);

  cy.get('[data-test="password"]').type(password);

  return cy.get('[data-test="login-button"]').click();
}); 


Cypress.Commands.add('LoginPom', (username, password) => {
  return loginPage.login(username , password)
});


Cypress.Commands.add(
  'typeSecret',
  { prevSubject: 'element' },
  (subject, text) => {
    return cy.wrap(subject).type(text, {
      log: false,
    });
  },
);
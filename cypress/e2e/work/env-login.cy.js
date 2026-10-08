it('Вхід на SauceDemo з даними запуску', () => {
  cy.env(['SAUCE_USER', 'SAUCE_PASSWORD']).then(
    ({ SAUCE_USER, SAUCE_PASSWORD }) => {
      if (!SAUCE_USER || !SAUCE_PASSWORD) {
        throw new Error(
          'Передайте SAUCE_USER і SAUCE_PASSWORD під час запуску',
        );
      }

      cy.visit('https://www.saucedemo.com/');

      cy.get('[data-test="username"]').type(SAUCE_USER);

      cy.get('[data-test="password"]').type(SAUCE_PASSWORD, {
        log: false,
      });

      cy.get('[data-test="login-button"]').click();
    },
  );

  cy.location('pathname').should('eq', '/inventory.html');
});
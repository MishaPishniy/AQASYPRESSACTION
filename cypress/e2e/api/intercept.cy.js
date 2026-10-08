/* cy.intercept(
  'GET',
  '**/posts'
).as('getPosts')

cy.visit('/posts')

cy.wait('@getPosts')

*/
////////////////
cy.visit('/posts')

cy.intercept(
  'GET',
  '**/posts'
).as('getPosts')

cy.wait('@getPosts') */
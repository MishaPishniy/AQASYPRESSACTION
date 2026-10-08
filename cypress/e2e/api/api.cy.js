describe("API Testing", () => {
  it("GET post", () => {
    cy.request("GET", "/users/1").then((response) => {
      cy.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body.id).to.eq(1);
    });
  });

  it("POST post", () => {
    cy.request("POST", "/posts", {
      title: "Cypress API",
      body: "Learning API Testing",
    },headers: {
      "Content-Type": "application/json"
    }).then((response) => {
      cy.log(response.body);
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body.id).to.eq(101);
    });

 it("POST post", () => {
    cy.request('/posts/1')
  .its('status')
  .should('eq', 200)
 })
  });
});

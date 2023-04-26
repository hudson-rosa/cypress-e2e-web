describe("SWAPI testing", () => {
  it("returns a Star Wars character - GET", { tags: ['@api', '@character'] }, () => {
    cy.getSwapiPeople().as("swapiPeople").its("status").should("equal", 200);
    cy.get("@swapiPeople").then(response => {
      expect(response.status).to.eq(200);
    });
  });
});

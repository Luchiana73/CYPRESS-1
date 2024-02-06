describe("visit site and check the page is loaded", () => {
  it.skip("should visit site and check page loaded", () => {
    cy.visit("https://sqlverifier-live-6e21ca0ed768.herokuapp.com");
    cy.get(".brand-title").should("exist").and("be.visible");
  });
});

describe("Bare bones smoke test", () => {
  it("Visits my site", () => {
    cy.visit("http://localhost:8080/login").as("login");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.contains("someone else").click();
    cy.get('input[name="email"]').type("stevegazzojr@gmail.com");
    cy.contains("SMS").click();
    cy.contains("Submit").click();
  });
});

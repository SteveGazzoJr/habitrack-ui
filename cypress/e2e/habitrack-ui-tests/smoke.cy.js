describe("Bare bones smoke test", () => {
  it("Can log in", () => {
    cy.intercept("POST", "verificationCode/*", {
      fixture: "userDetails.json",
    }).as("loginEndpoints");

    cy.visit("http://localhost:8080/login").as("login");
    cy.get('input[name="email"]').type("stevegazzojr@gmail.com");
    cy.contains("SMS").click();
    cy.contains("Submit").click();
    cy.get('input[name="code"]').type("0123");
    cy.contains("Submit").click();
    cy.url().should("include", "/eventtracker");
  });

  it("Can search for an event", () => {
    cy.intercept("GET", "event/models?title=*", {
      fixture: "trackerSearch.json",
    }).as("eventModelSearch");

    cy.visit("http://localhost:8080/eventtracker").as("tracker");
    cy.get('input[name="typeahead"]').type("Sh").contains("oulder day").click();
  });
});

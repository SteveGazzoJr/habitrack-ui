describe("Bare bones smoke test", () => {
  it("Can log in and log out", () => {
    cy.intercept("POST", "verificationCode/*", {
      fixture: "userDetails.json",
      headers: {
        "Access-Control-Expose-Headers": "x-token",
        "x-token":
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDBlMWZlYy1mOWQ0LTQwZGItYmQzMS0xZmZmYjE0MDIzM2MiLCJkaXNwbGF5TmFtZSI6IlN0ZXZlIiwiZW1haWwiOiJzdGV2ZWdhenpvanJAZ21haWwuY29tIiwicGhvbmUiOiI0MTI4NzQ1MTU1IiwiY29udGFjdFByZWZlcmVuY2UiOiJTTVMiLCJyb2xlIjoiVVNFUiIsInNtc1ZlcmlmaWVkIjpmYWxzZSwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImV4cCI6MTkzMjc1MDU4NH0.m8PE6t-MzIbQRpPJG8CbYeUXKyBKcYyU9B_bc2lMutU",
      },
    }).as("loginEndpoints");

    cy.visit("http://localhost:8080/");
    cy.contains("Login").click();

    cy.visit("http://localhost:8080/login").as("login");
    cy.get('input[name="email"]').type("stevegazzojr@gmail.com");
    cy.contains("SMS").click();
    cy.contains("Submit").click();
    cy.get('input[name="code"]').type("0123");
    cy.contains("Submit").click();
    cy.url().should("include", "/eventtracker");
    cy.contains("Log Out").click();
    cy.contains("Log In").should("exist");
  });

  it("Can search for an event model and submit an event", () => {
    cy.intercept("GET", "event/models?title=*", {
      fixture: "trackerSearch.json",
    }).as("eventModelSearch");

    cy.intercept("GET", "event/model/*", {
      fixture: "modelResponse.json",
    }).as("getEventModel");

    cy.intercept("POST", "event", {
      fixture: "postEventResponse.json",
    }).as("postEvent");

    cy.visit("http://localhost:8080/eventtracker").as("tracker");
    cy.get('input[name="typeahead"]')
      .type("Sh")
      .get(".simple-typeahead-list-item-text")
      .click();

    cy.get('input[name="date"]').type("2024-09-11");
    cy.get(".tag-input").type("testTag").type("{enter}");
    cy.get(".tags").eq(0).should("contain.text", "testTag");
    cy.contains("Submit").click();
    cy.get('input[name="typeahead"]').should("contain.text", "");
  });

  it("Can create an event model", () => {
    cy.intercept("POST", "event/model", {
      fixture: "postModelResponse.json",
    }).as("postModel");

    cy.visit("http://localhost:8080/eventcreator").as("creator");
    cy.contains("Submit").click();
    cy.contains("Please select a color").should("exist");
    cy.get(".current-color").click();
    cy.get(".vc-compact__color_cube").click({ multiple: true });
    cy.contains("Submit").click();
    cy.contains("Please enter a title").should("exist");
    cy.get(".title").type("testTitle");
    cy.get(".tag-input").type("testCategory").type("{enter}");
    cy.contains("Submit").click();
    cy.contains("Please select a color").should("not.exist");
    cy.contains("Please enter a title").should("not.exist");
  });
});

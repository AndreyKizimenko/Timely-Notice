describe("Core authentication", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/signin");
  });

  it("Authentication page title", () => {
    cy.title().should("eq", "Issue tracker");
  });

  it("Checking page title", () => {
    cy.get("[data-cy='signin-heading']").should("exist").contains("Sign In");
  });

  it("Checking sign in", () => {
    cy.get('[data-cy="email-input"]').type("andreykizimenko5@gmail.com");
    cy.get('[data-cy="password-input"]').type("TestTest1!");
    cy.get("[data-cy='submit-button']").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});

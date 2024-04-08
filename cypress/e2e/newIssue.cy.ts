describe("New Issue", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/issues/list");
    cy.signIn({ skipAuth: true });
    cy.getByData("new-issue-button").click();
  });

  it("URL and page elements", () => {
    cy.location("pathname").should("eq", "/issues/new");
    cy.getByData("new-issue-title").should("exist");
    cy.getByData("new-issue-description").should("exist");
    cy.getByData("new-issue-submit").should("exist");
  });

  it("Adding a new issue", () => {
    const currentDateTime = new Date().toLocaleString();
    // Creating an issue
    cy.getByData("new-issue-title").type("A new issue title from " + currentDateTime);
    cy.getByData("new-issue-description").type("A new issue description from " + currentDateTime);
    cy.getByData("new-issue-submit").click();
    cy.location("pathname").should("eq", "/issues/list");
    // Verifying an issue existence

    cy.getByData("t-header-createdAt").click();
    cy.get("tbody tr td").eq(1).should("contain", currentDateTime);
  });
});

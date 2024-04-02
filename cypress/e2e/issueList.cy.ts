describe("Issue list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/issues/list");
    cy.signIn({ skipAuth: true });
  });

  context("Page elements", () => {
    it("Page url", () => {
      cy.location("pathname").should("eq", "/issues/list");
    });

    it("Create new issue button", () => {
      cy.getByData("new-issue-button").contains("New issue");
    });
    it.only("Status filter dropdown", () => {
      cy.getByData("status-dropdown").click().contains("All");
      cy.getByData("status-All").contains("All");
      cy.getByData("status-OPEN").contains("Open");
      cy.getByData("status-IN_PROGRESS").contains("In Progress");
      cy.getByData("status-CLOSED").contains("Closed");
    });
    it("Table headers", () => {});
    it("Issues list", () => {});
    it("Pagination buttons", () => {});
  });
});

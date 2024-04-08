import { faker } from "@faker-js/faker";

describe("New Issue", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/issues/list");
    cy.signIn({ skipAuth: true });
    cy.getByData("new-issue-button").click();
  });

  // Positive scenarios

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

  // Negative scenarios

  it("Submitting with various fields empty", () => {
    // All fields empty
    cy.getByData("new-issue-submit").click();
    cy.getByData("input-error-message").eq(0).should("contain", "at least 1 character");
    cy.getByData("input-error-message").eq(1).should("contain", "at least 5 characters");
    // Title empty
    cy.getByData("new-issue-description").clear().type(faker.string.alphanumeric(5));
    cy.getByData("new-issue-submit").click();
    cy.getByData("input-error-message").should("contain", "at least 1 character");
    // Description empty
    cy.getByData("new-issue-title").clear().type(faker.string.alphanumeric(2));
    cy.getByData("new-issue-description").clear()
    cy.getByData("new-issue-submit").click();
    cy.getByData("input-error-message").should("contain", "at least 5 characters");
  });

  it("Form schema verifications", () => {
    // Title too long
    cy.getByData("new-issue-title").clear().type(faker.string.alphanumeric(256));
    cy.getByData("new-issue-description").clear().type(faker.string.alphanumeric(5));
    cy.getByData("new-issue-submit").click();
    cy.getByData("input-error-message").should("contain", "longer than 255 characters");
    // Description too short
    cy.getByData("new-issue-title").clear().type(faker.string.alphanumeric(2));
    cy.getByData("new-issue-description").clear().type(faker.string.alphanumeric(4));
    cy.getByData("new-issue-submit").click();
    cy.getByData("input-error-message").should("contain", "at least 5 characters");
  });
});

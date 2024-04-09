import { faker } from "@faker-js/faker";

describe("Individual Issue Page", () => {
  context.only("Issue page elements", () => {
    let testIssue = {
      id: 0,
      status: "",
      title: "",
      createdAt: "",
    };

    beforeEach(() => {
      cy.visit("http://localhost:3000/issues/list");
      cy.signIn({ skipAuth: true });

      // Select a random issue on the first page, save its details into a testIssue object
      cy.get("tbody > tr")
        .its("length")
        .then((n) => {
          const selectedIssue = Math.floor(Math.random() * n);
          cy.get("tbody > tr").eq(selectedIssue).as("randomIssue");
          // Getting issue ID
          cy.get("@randomIssue")
            .invoke("attr", "data-cy")
            .then((dataCy) => {
              testIssue.id = parseInt(dataCy!.match(/\d+/)![0]);
            });
          // Getting issue status
          cy.get("@randomIssue")
            .find("td span")
            .then((status) => {
              testIssue.status = status.text();
            });
          // Getting issue title
          cy.get("@randomIssue")
            .find("td a")
            .then((title) => {
              testIssue.title = title.text();
            });
          // Getting issue created at date
          cy.get("@randomIssue")
            .find("td")
            .eq(2)
            .then((createdAt) => {
              testIssue.createdAt = createdAt.text();
            });
          // Proceeding to the issue page
          cy.get("@randomIssue").find("a").click();
        });
    });

    it("Page url", function () {
      cy.location("pathname").should("eq", `/issues/${testIssue.id}`);
    });
    it("Issue details", function () {
      cy.getByData("issue-details").find("h1").should("contain", testIssue.title.slice(0, 50));
      cy.getByData("issue-details").find("div > span").should("contain", testIssue.status);
      cy.getByData("issue-details")
        .find("div > p")
        .then((createdDate) => {
          // Create a new Date object to convert it into the same format as the issueList page uses
          const dateObj = new Date(createdDate.text());
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const year = dateObj.getFullYear();
          const formattedDate = month + "/" + day + "/" + year;
          // Assert that the original date created matches the one displayed at the issue page
          expect(formattedDate).to.be.equal(testIssue.createdAt);
        });
    });

    it("Edit issue button", function () {
      cy.getByData("edit-issue-button").should("exist");
    });
    it("Delete issue button", function () {
      cy.getByData("delete-issue-button").should("exist");
    });
    it.only("Assign issue dropdown", function () {
      cy.getByData("assignee-dropdown").should("exist");
      let dbEmails: string[] = [];
      // fetching all user emails from an API endpoint
      cy.request("http://localhost:3000/api/users").then(({ body }) => {
        // @ts-ignore
        body.map((user) => {
          dbEmails.push(user.email);
        });
      });

      cy.getByData("assignee-dropdown").click();
      cy.getByData("assignee-dropdown-items")
        .find("span")
        .then((spans) => {
          const dropdownEmails: string[] = [];
          // populating emails array from every span that was found in the dropdown
          spans.each((index, span) => {
            if (span.textContent!.trim() && span.textContent!.trim() !== "Unassigned")
              dropdownEmails.push(span.textContent!.trim());
          });
          // assertion to confirm that API array and dropdown array contain the same members
          expect(dropdownEmails).to.include.members(dbEmails);
        });
    });
  });

  context("Issue page actions", () => {
    let selectedIssue: number;
    beforeEach(() => {
      cy.visit("http://localhost:3000/issues/list");
      cy.signIn({ skipAuth: true });
      cy.get("tbody > tr")
        .its("length")
        .then((n) => {
          selectedIssue = Math.floor(Math.random() * n);
          cy.get("tbody > tr").eq(selectedIssue).click();
        });
    });

    it("Assigning an issue", () => {});
    it("Editing an issue", () => {});
    it("Deleting an issue", () => {});
  });
});

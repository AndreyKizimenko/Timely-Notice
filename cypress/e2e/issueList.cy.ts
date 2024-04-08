interface Status {
  value: "OPEN" | "CLOSED" | "IN_PROGRESS" | "All";
  name: "Open" | "Closed" | "In Progress" | "All";
}
interface Statuses {
  statuses: Status[];
}

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
    it("Status filter dropdown", () => {
      cy.getByData("status-dropdown").click().contains("All");
      cy.fixture("issue_statuses.json").then(({ statuses }: Statuses) => {
        statuses.map((status) => {
          cy.getByData(`status-${status.value}`).contains(status.name);
        });
      });
    });
    it("Table headers", () => {
      const headers = [
        { value: "status", name: "Status" },
        { value: "title", name: "Title" },
        { value: "createdAt", name: "Created At" },
      ];
      headers.map((header) => {
        cy.getByData(`t-header-${header.value}`).click().contains(header.name);
        cy.location("search").should("equal", `?orderBy=${header.value}`);
      });
    });
    it("Issues list", () => {
      cy.get("tbody > tr").each((row) => {
        cy.wrap(row)
          .find("td")
          .then((cells) => {
            expect(["Open", "Closed", "In Progress"]).to.include(cells.eq(0).text().trim());
            expect(cells.eq(1).text()).to.exist;
            expect(cells.eq(2).text()).to.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
          });
      });
    });
    it("Pagination buttons", () => {
      let currentPage: number;
      let lastPage: number;

      cy.getByData("pagination-text").then((pageText) => {
        const paginationStatus = pageText.text();
        const pages = paginationStatus.match(/(\d+) \/ (\d+)/);
        if (pages) {
          currentPage = parseInt(pages[1]);
          lastPage = parseInt(pages[2]);
        }
        expect(currentPage).to.be.equal(1);

        cy.getByData("pagination-first").should("be.disabled");
        cy.getByData("pagination-previous").should("be.disabled");

        if (lastPage === currentPage) {
          cy.getByData("pagination-next").should("be.disabled");
          cy.getByData("pagination-last").should("be.disabled");
        } else {
          cy.getByData("pagination-next").should("not.be.disabled");
          cy.getByData("pagination-last").should("not.be.disabled");

          cy.getByData("pagination-next").click();

          cy.getByData("pagination-first").should("not.be.disabled");
          cy.getByData("pagination-previous").should("not.be.disabled");
        }
      });
    });
  });
});

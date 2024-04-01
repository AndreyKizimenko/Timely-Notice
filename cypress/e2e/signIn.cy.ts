type Account = {
  userEmail: string;
  userPassword: string;
};

type ValidAccounts = Account[];

interface InvalidAccounts {
  invalid_email_valid_password: Account[];
  valid_email_invalid_password: Account[];
}

describe("Core authentication", () => {
  let validAccounts: ValidAccounts;
  let invalidAccoutns: InvalidAccounts;

  beforeEach(() => {
    cy.fixture("valid_accounts.json").then((data) => {
      cy.log(data);
      validAccounts = data;
    });
    cy.fixture("invalid_accounts.json").then((data) => {
      cy.log(data);
      invalidAccoutns = data;
    });

    cy.visit("http://localhost:3000/auth/signin");
  });

  context("Page elements", () => {
    it("Authentication page title", () => {
      cy.title().should("eq", "Issue tracker");
    });

    it("Checking page title", () => {
      cy.getByData("signin-heading").should("exist").contains("Sign In");
    });
  });

  context.only("Sign in flow - Positive", () => {
    const numberOfAccounts = 5;
    let registeredAccounts: ValidAccounts;

    before(() => {
      cy.fixture("valid_accounts.json").then((data) => {
        registeredAccounts = data.registered_accounts.slice(0, numberOfAccounts);
      });
    });

    for (let i = 0; i < numberOfAccounts; i++) {
      it("Checking sign in", () => {
        cy.signIn(registeredAccounts[i]);
        cy.location("pathname").should("eq", "/");
        cy.title().should("eq", "Issue tracker - Dashboard");

        cy.getByData("auth-dropdown").click();
        cy.getByData("auth-signout").click();

        cy.location("pathname").should("include", "signin");
        cy.title().should("eq", "Issue tracker");
        cy.getByData("signin-heading").should("exist").contains("Sign In");
      });
    }
  });
});

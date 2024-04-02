import { faker } from "@faker-js/faker";

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
  const numberOfAccounts = 2;
  let registeredAccounts: ValidAccounts;

  before(() => {
    cy.fixture("valid_accounts.json").then((data) => {
      registeredAccounts = data.registered_accounts.slice(0, numberOfAccounts);
    });
  });
  beforeEach(() => {
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

  context("Sign in flow - Positive", () => {
    for (let i = 0; i < numberOfAccounts; i++) {
      it("Checking sign in", () => {
        // Sign in
        cy.signIn(registeredAccounts[i]);
        cy.location("pathname").should("eq", "/");
        cy.title().should("eq", "Issue tracker - Dashboard");
        // Sign out
        cy.getByData("auth-dropdown").click();
        cy.getByData("auth-signout").click();
        // Assert that the user is on the sign in page
        cy.location("pathname").should("include", "signin");
        cy.title().should("eq", "Issue tracker");
        cy.getByData("signin-heading").should("exist").contains("Sign In");
      });
    }
  });

  context("Sign in flow - Negative", () => {
    afterEach(() => {
      cy.location("pathname").should("eq", "/auth/signin");
    });
    it("Submitting with all fields empty", () => {
      cy.signIn({});
      cy.get("form p").should("have.length", 2);
    });
    it("Submitting with email field empty", () => {
      cy.signIn({ userEmail: registeredAccounts[0].userEmail });
      cy.get("form p").contains("Password");
    });
    it("Submitting with password field empty", () => {
      cy.signIn({ userPassword: registeredAccounts[0].userPassword });
      cy.get("form p").contains("email");
    });
    it("Invalid password, valid email", () => {
      cy.signIn({
        userEmail: registeredAccounts[0].userEmail,
        userPassword: registeredAccounts[0].userPassword + "X",
      });
      cy.getByData("auth-warning").should("be.visible");
    });
    it("Valid email, different account password", () => {
      cy.signIn({
        userEmail: registeredAccounts[0].userEmail,
        userPassword: registeredAccounts[1].userPassword,
      });
      cy.getByData("auth-warning").should("be.visible");
    });
    it("Invalid password and email", () => {
      cy.signIn({
        userEmail: faker.internet.email(),
        userPassword: faker.internet.password({ length: 14 }),
      });
      cy.getByData("auth-warning").should("be.visible");
    });
  });
});

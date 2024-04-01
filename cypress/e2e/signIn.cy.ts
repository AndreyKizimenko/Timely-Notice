type Account = {
  userEmail: string;
  userPassword: string;
};

interface ValidAccounts {
  registered_accounts: Account[];
  valid_passwords: string[];
}
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

  context("Sign in flow", () => {
    it("Checking sign in", () => {
      cy.getByData("email-input").type(validAccounts.registered_accounts[1].userEmail);
      cy.getByData("password-input").type(validAccounts.registered_accounts[1].userPassword);
      cy.getByData("submit-button").click();
      cy.location("pathname").should("eq", "/"); 
      cy.title().should("eq", "Issue tracker - Dashboard");     
    });
  });
});

import { faker } from "@faker-js/faker";

type NewAccount = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

const passwords = ["Test@1234", "P@ssw0rd!", "Secret123#", "SecurePwd789*", "RandomP@ss1"];

describe("Core authentication", () => {
  let validAccounts: ValidAccounts;
  let invalidAccoutns: InvalidAccounts;

  context("Accessing the Sign Up page", () => {
    afterEach(() => {
      cy.location("pathname").should("eq", "/auth/signup");
      cy.getByData("signup-heading").invoke("text").should("eq", "Sign Up");
    });

    it("Direct link", () => {
      cy.visit("http://localhost:3000/auth/signup");
    });

    it("Create a new account button", () => {
      cy.visit("http://localhost:3000/auth/signin");
      cy.getByData("register-button").click();
    });

    it("Navbar dropdown button", () => {
      cy.visit("http://localhost:3000/auth/signin");
      cy.getByData("auth-dropdown").click();
      cy.getByData("auth-signup").click();
    });
  });

  context("Regestiring a new account - Positive", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth/signup");
    });

    it("Valid email and valid password", () => {
      const newAccount = {
        userName: faker.person.fullName(),
        userEmail: faker.internet.email(),
        userPassword: passwords[Math.floor(Math.random() * passwords.length)],
      };

      cy.getByData("name-input").type(newAccount.userName);
      cy.getByData("email-input").type(newAccount.userEmail);
      cy.getByData("password-input").type(newAccount.userPassword);
      cy.getByData("password-confirm-input").type(newAccount.userPassword);

      cy.updateAccountsArray(newAccount);
      cy.getByData("submit-button").click();

      cy.location("pathname").should("eq", "/");
      cy.title().should("eq", "Issue tracker - Dashboard");
    });
  });

  context.only("Registering a new account - Negative", () => {
    let newAccount: NewAccount;
    beforeEach(() => {
      newAccount = newAccount = {
        userName: faker.person.fullName(),
        userEmail: faker.internet.email(),
        userPassword: passwords[Math.floor(Math.random() * passwords.length)],
      };
      cy.visit("http://localhost:3000/auth/signup");
    });

    it("Regestering with all empty fields", () => {
      cy.getByData("submit-button").click();
      
    });
  });
});

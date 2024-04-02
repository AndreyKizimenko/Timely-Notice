import { faker } from "@faker-js/faker";

type NewAccount = {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRepeatPassword?: string;
};

const passwords = ["Test@1234", "P@ssw0rd!", "Secret123#", "SecurePwd789*", "RandomP@ss1"];

describe("Core authentication", () => {
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
      let newAccount: NewAccount = {
        userName: faker.person.fullName(),
        
        userEmail: faker.internet.email(),
        userPassword: passwords[Math.floor(Math.random() * passwords.length)],
      };
      newAccount.userRepeatPassword = newAccount.userPassword;

      cy.registerUser(newAccount);
      cy.updateAccountsArray(newAccount);

      cy.location("pathname").should("eq", "/");
      cy.title().should("eq", "Issue tracker - Dashboard");
    });
  });

  context("Registering a new account - Negative", () => {
    let newAccount: NewAccount;
    beforeEach(() => {
      newAccount = newAccount = {
        userName: faker.person.fullName(),
        userEmail: faker.internet.email(),
        userPassword: passwords[Math.floor(Math.random() * passwords.length)],
      };
      newAccount.userRepeatPassword = newAccount.userPassword;
      cy.visit("http://localhost:3000/auth/signup");
    });

    afterEach(() => {
      cy.location("pathname").should("eq", "/auth/signup");
    });

    it("All fields empty ", () => {
      cy.getByData("submit-button").click();
      cy.getByData("signup-form").get("p").should("have.length", 4);
    });

    it("Name field empty", () => {
      delete newAccount.userName;
      cy.registerUser(newAccount);
      cy.getByData("signup-form").get("p").contains("Name");
    });

    it("Email field empty", () => {
      delete newAccount.userEmail;
      cy.registerUser(newAccount);
      cy.getByData("signup-form").get("p").contains("email");
    });

    it("Password field empty", () => {
      delete newAccount.userPassword;
      cy.registerUser(newAccount);
      cy.getByData("signup-form").get("p").contains("Password");
    });

    it("Repeat password field empty", () => {
      delete newAccount.userRepeatPassword;
      cy.registerUser(newAccount);
      cy.getByData("signup-form").get("p").contains("Password");
    });

    it("Repeat password mismatch", () => {
      newAccount.userRepeatPassword = newAccount.userPassword + "X";
      cy.registerUser(newAccount);
      cy.getByData("signup-form").get("p").contains("match");
    });

    for (let index = 0; index < 5; index++) {
      it("Invalid email", () => {
        cy.fixture("invalid_accounts").then((data) => {
          newAccount.userEmail = data.invalid_emails[index];
          cy.registerUser(newAccount);
          cy.focused().should("have.attr", "data-cy", "email-input")
        });
      });
    }

    for (let index = 0; index < 6; index++) {
      it("Invalid password", () => {
        cy.fixture("invalid_accounts").then((data) => {
          newAccount.userPassword = data.invalid_passwords[index];
          newAccount.userRepeatPassword = data.invalid_passwords[index];
          cy.registerUser(newAccount);
          cy.getByData("signup-form").get("p").contains("Password");
        });
      });
    }
    
  });
});

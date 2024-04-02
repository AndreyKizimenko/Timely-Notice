/// <reference types="cypress" />
interface NewAccount {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRepeatPassword?: string;
}
interface SignInOptions {
  userEmail?: string;
  userPassword?: string;
  skipAuth?: boolean;
}

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    updateAccountsArray(newAccount: NewAccount): Chainable<void>;
    registerUser(newAccount: NewAccount): Chainable<void>;
    signIn(userAccount: SignInOptions): Chainable<void>;
  }
}

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add(
  "registerUser",
  ({ userEmail, userName, userPassword, userRepeatPassword }: NewAccount) => {
    userName && cy.getByData("name-input").type(userName);
    userEmail && cy.getByData("email-input").type(userEmail);
    userPassword && cy.getByData("password-input").type(userPassword);
    userRepeatPassword && cy.getByData("password-confirm-input").type(userRepeatPassword);
    cy.getByData("submit-button").click();
  }
);

Cypress.Commands.add("signIn", ({ userEmail, userPassword, skipAuth }: SignInOptions) => {
  if (skipAuth) {
    cy.getByData("email-input").type("Susana45@gmail.com");
    cy.getByData("password-input").type("SecurePwd789*");
  }
  userEmail && cy.getByData("email-input").type(userEmail);
  userPassword && cy.getByData("password-input").type(userPassword);
  cy.getByData("submit-button").click();
});

Cypress.Commands.add("updateAccountsArray", (newAccount) => {
  cy.fixture("valid_accounts.json").then((jsonData) => {
    jsonData.registered_accounts.push(newAccount);
    // Write the updated JSON data
    cy.writeFile("cypress/fixtures/valid_accounts.json", jsonData);
  });
});

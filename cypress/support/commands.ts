/// <reference types="cypress" />
interface NewAccount {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRepeatPassword?: string;
}

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    updateAccountsArray(newAccount: NewAccount): Chainable<void>;
    registerUser(newAccount: NewAccount): Chainable<void>;
  }
}

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add("registerUser", (newAccount: NewAccount) => {
  newAccount.userName && cy.getByData("name-input").type(newAccount.userName);
  newAccount.userEmail && cy.getByData("email-input").type(newAccount.userEmail);
  newAccount.userPassword && cy.getByData("password-input").type(newAccount.userPassword);  
  newAccount.userRepeatPassword && cy.getByData("password-confirm-input").type(newAccount.userRepeatPassword);  
  cy.getByData("submit-button").click();
});

Cypress.Commands.add("updateAccountsArray", (newAccount) => {
  cy.fixture("valid_accounts.json").then((jsonData) => {
    jsonData.registered_accounts.push(newAccount);
    // Write the updated JSON data
    cy.writeFile("cypress/fixtures/valid_accounts.json", jsonData);
  });
});

/// <reference types="cypress" />
interface NewAccount {
  userName: String;
  userEmail: String;
  userPassword: String;
}

declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    updateAccountsArray(newAccount: NewAccount): Chainable<void>;
  }
}

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add("updateAccountsArray", (newAccount) => {
  cy.fixture("valid_accounts.json").then((jsonData) => {
    jsonData.registered_accounts.push(newAccount);
    // Write the updated JSON data
    cy.writeFile("cypress/fixtures/valid_accounts.json", jsonData);
  });
});

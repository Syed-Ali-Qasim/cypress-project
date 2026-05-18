// cypress/support/commands.js
// Task 2 — Custom Commands

// Custom command: login
// Usage: cy.login('standard_user', 'secret_sauce')
// This replaces the 4 repeated steps with 1 clean command
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com')
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
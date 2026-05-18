// cypress/e2e/login.cy.js
// Task 1 — Login Tests (3 test cases)

describe('Login Tests — saucedemo.com', () => {

  // -------------------------------------------------------
  // Login Test 1: Valid credentials → lands on dashboard
  // -------------------------------------------------------
  it('Login Test 1: should login successfully with valid credentials', () => {
    // Step 1: Open the website
    cy.visit('https://www.saucedemo.com')

    // Step 2: Type the correct username
    cy.get('#user-name').type('standard_user')

    // Step 3: Type the correct password
    cy.get('#password').type('secret_sauce')

    // Step 4: Click the Login button
    cy.get('#login-button').click()

    // Step 5: Assert — we should now be on the inventory/dashboard page
    cy.url().should('include', '/inventory')

    // Step 6: Assert — the heading "Products" should be visible
    cy.get('.title').should('have.text', 'Products')
  })


  // -------------------------------------------------------
  // Login Test 2: Wrong password → error message appears
  // -------------------------------------------------------
  it('Login Test 2: should show error message for incorrect password', () => {
    cy.visit('https://www.saucedemo.com')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')   // incorrect password
    cy.get('#login-button').click()

    // Assert: an error message element should be visible
    cy.get('[data-test="error"]').should('be.visible')

    // Assert: the error text should mention "Username and password do not match"
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })


  // -------------------------------------------------------
  // Login Test 3: Empty fields → validation message
  // -------------------------------------------------------
  it('Login Test 3: should show validation error when fields are empty', () => {
    cy.visit('https://www.saucedemo.com')

    // Do NOT type anything — leave both fields empty
    cy.get('#login-button').click()

    // Assert: error message should appear
    cy.get('[data-test="error"]').should('be.visible')

    // Assert: error should mention that username is required
    cy.get('[data-test="error"]').should('contain', 'Username is required')
  })

})
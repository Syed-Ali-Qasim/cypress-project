// cypress/e2e/navigation.cy.js
// Task 1 — Navigation Tests (2 test cases) + Form Test (1 test case)

describe('Navigation & Form Tests — saucedemo.com', () => {

  // Helper: log in before navigation tests
  // (We log in because the navigation items are only accessible after login)
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    // Wait until inventory page loads
    cy.url().should('include', '/inventory')
  })


  // -------------------------------------------------------
  // Navigation Test 1: Click menu link → correct page opens
  // -------------------------------------------------------
  it('Navigation Test 1: should open About page from the hamburger menu', () => {
    // Step 1: Open the hamburger menu (top-left ≡ button)
    cy.get('#react-burger-menu-btn').click()

    // Step 2: Wait for menu to open, then click "About"
    cy.get('#about_sidebar_link').should('be.visible').click()

    // Step 3: Assert the URL changed to the Sauce Labs about page
    cy.url().should('include', 'saucelabs.com')
  })


  // -------------------------------------------------------
  // Navigation Test 2: Visit 2 pages in sequence, assert headings
  // -------------------------------------------------------
  it('Navigation Test 2: should show correct headings on Products and Cart pages', () => {
    // -- Page 1: Products page --
    cy.get('.title').should('have.text', 'Products')
    cy.url().should('include', '/inventory')

    // -- Navigate to Page 2: Cart --
    cy.get('.shopping_cart_link').click()

    // Assert: Cart page heading
    cy.get('.title').should('have.text', 'Your Cart')
    cy.url().should('include', '/cart')
  })


  // -------------------------------------------------------
  // Form Test 1: Fill checkout form and assert confirmation
  // -------------------------------------------------------
  it('Form Test 1: should complete checkout form and show confirmation', () => {
    // Step 1: Add an item to the cart first
    cy.get('#add-to-cart-sauce-labs-backpack').click()

    // Step 2: Go to cart
    cy.get('.shopping_cart_link').click()

    // Step 3: Click Checkout
    cy.get('#checkout').click()
    cy.url().should('include', '/checkout-step-one')

    // Step 4: Fill out the checkout form
    cy.get('#first-name').type('Ali')
    cy.get('#last-name').type('Hassan')
    cy.get('#postal-code').type('54000')

    // Step 5: Continue
    cy.get('#continue').click()
    cy.url().should('include', '/checkout-step-two')

    // Step 6: Finish the order
    cy.get('#finish').click()

    // Step 7: Assert success confirmation message
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    cy.get('.complete-text').should('be.visible')
  })

})
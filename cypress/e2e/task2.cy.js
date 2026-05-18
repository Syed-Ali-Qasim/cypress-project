// cypress/e2e/task2.cy.js
// Task 2 — Assertions, Aliases & Custom Commands

describe('Task 2 — Assertions, Aliases & Custom Commands', () => {

  // -------------------------------------------------------
  // beforeEach Hook — runs before EVERY test in this block
  // cy.visit() is called here once instead of in every test
  // -------------------------------------------------------
  beforeEach(() => {
    // Use the CUSTOM COMMAND we defined in commands.js
    cy.login('standard_user', 'secret_sauce')
    // After this, every test starts already logged in on the inventory page
  })


  // -------------------------------------------------------
  // Assertion Practice — 3 different assertion types
  // -------------------------------------------------------

  it('Assertion 1: logo image should be visible (be.visible)', () => {
    // be.visible — checks the element is displayed on screen
    cy.get('.app_logo').should('be.visible')
  })

  it('Assertion 2: page title should have exact text (have.text)', () => {
    // have.text — checks the element contains exact text content
    cy.get('.title').should('have.text', 'Products')
  })

  it('Assertion 3: cart link should have a href attribute (have.attr)', () => {
    // have.attr — checks the element has a specific HTML attribute
    cy.get('.shopping_cart_link').should('have.attr', 'href', '/cart')
  })


  // -------------------------------------------------------
  // Negative Assertion — something should NOT exist / NOT be visible
  // -------------------------------------------------------
  it('Negative Assertion: error message should NOT exist on successful login', () => {
    // After a successful login, there should be NO error message on screen
    // not.exist — checks the element does not exist in the DOM at all
    cy.get('[data-test="error"]').should('not.exist')
  })

  it('Negative Assertion: cart badge should NOT be visible when cart is empty', () => {
    // The red cart badge only appears when items are in the cart
    // On a fresh login with empty cart, it should not be visible
    cy.get('.shopping_cart_badge').should('not.exist')
  })


  // -------------------------------------------------------
  // Alias Practice — save an element, use it later with @
  // -------------------------------------------------------
  it('Alias Practice: save username field as alias and interact twice', () => {
    // We need to visit the login page directly for this test
    cy.visit('https://www.saucedemo.com')

    // Step 1: Find the username input and SAVE it as an alias named "usernameInput"
    cy.get('#user-name').as('usernameInput')

    // Step 2: Use the alias to type into the field (@ prefix = alias)
    cy.get('@usernameInput').type('standard_user')

    // Step 3: Use the alias AGAIN to assert the value was typed correctly
    cy.get('@usernameInput').should('have.value', 'standard_user')

    // Step 4: Clear and retype using the alias (showing we can reuse it)
    cy.get('@usernameInput').clear().type('locked_out_user')
    cy.get('@usernameInput').should('have.value', 'locked_out_user')
  })

  it('Alias Practice: save product item as alias and add it to cart', () => {
    // Save the first product item as an alias
    cy.get('.inventory_item').first().as('firstProduct')

    // Use alias to find the Add to Cart button within that product
    cy.get('@firstProduct').find('button').should('have.text', 'Add to cart')
    cy.get('@firstProduct').find('button').click()

    // Assert the cart badge now shows 1 item
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })


  // -------------------------------------------------------
  // Custom Command in Use — using cy.login() we defined
  // -------------------------------------------------------
  it('Custom Command: cy.login() should log in and land on inventory page', () => {
    // The beforeEach already called cy.login() for us.
    // This test just verifies we are on the right page as a result.
    cy.url().should('include', '/inventory')
    cy.get('.title').should('have.text', 'Products')

    // Take a screenshot as proof of passing state
    cy.screenshot('task2-custom-command-login-success')
  })

})
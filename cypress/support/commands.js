/**
 * Fast selection
 */
Cypress.Commands.add('dataCy', (testId) => {
    return cy.get(`[data-testid="${testId}"]`);
});

/**
 * Login to application
 */
Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.config('baseUrl') + '/login');
    cy.get('body', { timeout: 10000 }).should('be.visible');
    cy.dataCy('email-input', { timeout: 10000 }).clear().type(email);
    cy.dataCy('password-input', { timeout: 10000 }).clear().type(password);
    cy.dataCy('login-button', { timeout: 10000 }).click();
});
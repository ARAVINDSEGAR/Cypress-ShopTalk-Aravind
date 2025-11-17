describe('Protected Routes and Error Handling', () => {
    beforeEach(() => {
        cy.fixture('users').as('users');
        cy.visit('/'); // unauthenticated state
    });

    it('Verify an unauthenticated users are redirected from dashboard to login', function () {
        cy.get('nav ul li a').contains('Dashboard').click();
        cy.location('pathname').should('equal', '/login');
        cy.get('h1').should('contain', 'Login');
    });

    it('Verify the direct URL access to dashboard without login redirects to login', function () {
        cy.visit('/dashboard');
        cy.location('pathname').should('equal', '/login');
        cy.get('h1').should('contain', 'Login');
    });

    it('Verify the login with incorrect credentials shows appropriate error', function () {
        cy.get('nav ul li a').contains('Login').click();
        const user = this.users.incorrect_login;
        cy.login(user.email, user.password);
        cy.contains('Invalid email or password', { timeout: 10000 }).should('be.visible');
    });
});
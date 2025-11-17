describe('Login Form Validation and Authentication', () => {
    beforeEach(() => {
        cy.fixture('users').as('users');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
        cy.visit('/login');
    });

    it('Verify the empty form submission validation', function () {
        cy.dataCy('login-button', { timeout: 10000 }).click();
        // Verify the error message
        cy.contains('Email is required', { timeout: 10000 }).should('be.visible');
        cy.contains('Password is required', { timeout: 10000 }).should('be.visible');
    });

    it('Verify the invalid email format validation', function () {
        const user = this.users.invalid_email_login;
        cy.login(user.email, user.password);
        cy.contains('Please enter a valid email address', { timeout: 10000 }).should('be.visible');
    });

    it('Verify the password too short validation', function () {
        const user = this.users.invalid_password_login;
        cy.login(user.email, user.password);
        cy.contains('Password must be at least 6 characters', { timeout: 10000 }).should('be.visible');
    });

    it('Verify with valid credentials submission and redirect to dashboard', function () {
        const user = this.users.correct_login;
        cy.login(user.email, user.password);
        // Verify login redirect to dashboards
        cy.url().should('include', '/dashboard');
        // Verify the user email is displayed on dashboard
        cy.contains(user.email, { timeout: 10000 }).should('be.visible');
        // Verify the logout functionality and redirect back to login page
        cy.dataCy('logout-button').click();
        cy.url({ timeout: 10000 }).should('include', '/login');
    });
});

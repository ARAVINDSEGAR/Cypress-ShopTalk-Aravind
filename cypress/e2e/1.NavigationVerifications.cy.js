describe('Navigation and basic page verification', () => {
    const navigationLinks = [
        { text: 'Home', href: '/' },
        { text: 'Login', href: '/login' },
        { text: 'Dashboard', href: '/dashboard' },
        { text: 'Products', href: '/products' },
        { text: 'Users', href: '/users' },
        { text: 'Posts', href: '/posts' },
        { text: 'Contact', href: '/contact' }
    ];

    it('Verify the basic page validations', function () {
        cy.visit('/');
        // Verify homepage loads correctly and displays the main heading
        cy.url({ timeout: 10000 }).should('include', 'shop-talk.heex.io');
        cy.get('h1').should('exist').and('be.visible').and('have.text', 'Welcome to ShopTalk');
        // Verify the all navigatioin links are present and functional
        navigationLinks.forEach(link => {
            cy.get('nav ul li a').contains(link.text).should('have.attr', 'href', link.href);
        });
        navigationLinks.forEach(link => {
            cy.get('nav ul', { timeout: 10000 }).should('be.visible');
            // Verify the navigation links navigate to correct page
            cy.contains('nav ul li a', link.text).click();
            // Dashboard redirects unauthenticated user to login
            if (link.href === '/dashboard') {
                cy.url({ timeout: 10000 }).should('include', '/login');
            }
            else {
                cy.url({ timeout: 10000 }).should('include', link.href);
            }
        });
    });
});
describe('API Testing - Users Page with Pagination', () => {
    it('Verify the user page with pagination', function () {
        cy.request('https://jsonplaceholder.typicode.com/users').then((response) => {
            expect(response.status).to.eq(200);
            // Verify the users are displays correctly
            cy.visit('/users');
            cy.get('[data-testid^="user-username"]', { timeout: 10000 }).should('have.length.gt', 0).and('be.visible');
            // Simulate total count to get expected number of pages (with 6 per page)
            const totalUsers = response.body.length;
            const pages = Math.ceil(totalUsers / 6);
            cy.get('[data-testid^="user-username"]').should('have.length', Math.min(totalUsers, 6));
            cy.dataCy('prev-page-button').should('be.disabled');
            cy.contains(`Page 1 of ${pages}`).should('be.visible');
            // If more than one page, navigate and check next/last page
            if (pages > 1) {
                cy.dataCy('next-page-button').click({ force: true });
                cy.contains(`Page 2 of ${pages}`, { timeout: 10000 }).should('be.visible');
                cy.get('[data-testid^="user-username"]').should('have.length', totalUsers - 6);
                cy.dataCy('next-page-button').should('be.disabled');
                cy.dataCy('prev-page-button').should('be.enabled');
            }
        });
    });
});
describe('Posts Page with Nested API Calls', () => {
    beforeEach(() => {
        cy.fixture('users').as('users');
        cy.intercept('GET', '/posts').as('fetchPosts');
        cy.visit('/posts');
        cy.wait('@fetchPosts');
    });

    it('Verify the initial API call to fetch the posts', function () {
        cy.get('@fetchPosts').its('response.statusCode').should('eq', 200);
        // Verify the posts are displayed after API loads
        cy.get('[data-testid^="post-title-"]').should('have.length.gt', 0).and('be.visible');
    });

    it('Verify the "Load Comments" triggers a second API call', () => {
        // Intercept the comments API call triggered by clicking "Load Comments"
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/*/comments').as('fetchComments');
        cy.dataCy('load-comments-1').click();
        cy.wait('@fetchComments').its('response.statusCode').should('eq', 200);
        // Verify the comments are displayed after API response
        cy.get('[data-testid^="comment-"]').should('have.length.gt', 0);
    });
});
import ContactPage from "../support/page-objects/ContactPage.cy";
describe('Contact Form Testing', () => {
    const contactpage = new ContactPage();
    const name = 'Aravind SEGAR';
    const email = 'aravind@test.com';
    const subject = 'QA Assessment';
    const message = 'This is a cypress test';
    beforeEach(() => {
        cy.visit('/');
        cy.get('nav ul li a').contains('Contact').click();
        cy.location('pathname').should('include', '/contact');
    });

    it('Verify the form submission with valid data', function () {
        contactpage.getFormSubmission(name, email, subject, message); // This reused method will be executed from Page Objects file
        // Verify the success message appears
        cy.contains('Thank you! Your message has been sent successfully.', { timeout: 10000 }).should('be.visible');
    });

    it('Display an error message when the API returns an error', function () {
        // Intercept the API call
        cy.intercept('POST', '**/contact**', {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
        }).as('contactApiError');
        contactpage.getFormSubmission(name, email, subject, message); // This reused method will be executed from Page Objects file
        // Wait for the API call and assert error handling UI
        cy.wait('@contactApiError').its('response.statusCode').should('eq', 500);
        cy.contains('There was an error sending your message. Please try again.').should('be.visible');
    });
});
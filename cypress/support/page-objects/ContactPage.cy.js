class ContactPage {
    getFormSubmission(name, email, subject, message) {
        cy.dataCy('contact-name').type(name);
        cy.dataCy('contact-email').type(email);
        cy.dataCy('contact-subject').type(subject);
        cy.dataCy('contact-message').type(message);
        cy.dataCy('contact-submit').should('be.enabled').click();
    }
}
export default ContactPage;
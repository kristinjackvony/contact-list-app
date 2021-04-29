describe('Add Contact', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type('test@fake.com')
        cy.get('#password').type('foobarfoo')
        cy.get('#submit').click()
        })

    it('Adds a new contact', () => {
        cy.get('#add-contact').click()
        cy.get('#firstName').type('Prunella')
        cy.get('#lastName').type('Prunewhip')
        cy.get('#birthdate').type('1969-05-13')
        cy.get('#email').type('pprunewhip@fake.com')
        cy.get('#phone').type('8008675309')
        cy.get('#street1').type('123 Sesame St.')
        cy.get('#street2').type('Apt. A')
        cy.get('#city').type('New York')
        cy.get('#stateProvince').type('NY')
        cy.get('#postalCode').type('01234')
        cy.get('#country').type('USA')
        cy.get('#submit').click()
        cy.contains('Prunella Prunewhip')
        cy.contains('1969-05-13')
        cy.contains('pprunewhip@fake.com')
        cy.contains('8008675309')
        cy.contains('123 Sesame St. Apt. A')
        cy.contains('New York NY')
        cy.contains('01234')
        cy.contains('USA').click()
        cy.get('#delete').click()
        cy.on('window:confirm', () => true);
    })

    it('Returns error when validation fails', () => {
        cy.get('#add-contact').click()
        cy.get('#firstName').type('Prunella')
        cy.get('#submit').click()
        cy.get('#error').should('contain', 'Contact validation failed: lastName')
    })

    it('Can cancel out of the Add Contact form', () => {
        cy.get('#add-contact').click()
        cy.get('#cancel').click()
        cy.title().should('eq', 'My Contacts')
    })
})
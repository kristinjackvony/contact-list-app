describe('Unit Tests', () => {
    it('Calls GET Contact List correctly', () => {
        cy.intercept('/contacts', [
            {
                firstName: 'Mock',
                lastName: 'User'
            }
        ])
        cy.visit('http://localhost:3000/contactList')
        cy.contains('Mock User')
    })

})
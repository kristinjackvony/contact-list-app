describe('Contact Details', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type('test@fake.com')
        cy.get('#password').type('foobarfoo')
        cy.get('#submit').click()
        cy.title().should('eq', 'My Contacts')
        cy.getCookie('token').then((cookie) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: {'Authorization': 'Bearer ' + cookie.value},
                body: {
                    "firstName": "Prunella",
                    "lastName": "Prunewhip",
                    "birthdate": "1969-05-13",
                    "email": "pprunewhip@fake.com",
                    "phone": "8008675309",
                    "street1": "123 Sesame St.",
                    "street2": "Apt. 1",
                    "city": "New York",
                    "stateProvince": "NY",
                    "postalCode": "01234",
                    "country": "USA"
                }
            })
        })
        cy.reload()
    })

    it('Can return to the Contact List page', () => {
        cy.contains('Prunella Prunewhip').click()
        cy.get('#return').click()
        cy.title().should('eq', 'My Contacts')
    })

})
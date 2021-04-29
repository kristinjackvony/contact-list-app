describe('Edit Contact', () => {

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

    it('Edits a new contact', () => {
        cy.contains('Prunella Prunewhip').click()
        cy.get('#edit-contact').click()
        cy.get('#firstName').clear().type('Joe')
        cy.get('#lastName').clear().type('Schmoe')
        cy.get('#birthdate').clear().type('1977-07-07')
        cy.get('#email').clear().type('jschmoe@fake.com')
        cy.get('#phone').clear().type('8005551000')
        cy.get('#street1').clear().type('1313 Mockingbird Lane')
        cy.get('#street2').clear().type('Unit 2')
        cy.get('#city').clear().type('Toronto')
        cy.get('#stateProvince').clear().type('ON')
        cy.get('#postalCode').clear().type('A1B2C3')
        cy.get('#country').clear().type('Canada')
        cy.get('#submit').click()
        cy.contains('Joe')
        cy.contains('Schmoe')
        cy.contains('1977-07-07')
        cy.contains('jschmoe@fake.com')
        cy.contains('8005551000')
        cy.contains('1313 Mockingbird Lane')
        cy.contains('Unit 2')
        cy.contains('Toronto')
        cy.contains('ON')
        cy.contains('A1B2C3')
        cy.contains('Canada')
        cy.get('#delete').click()
        cy.on('window:confirm', () => true);
    })

    it('Returns error when validation fails', () => {
        cy.contains('Prunella Prunewhip').click()
        cy.get('#edit-contact').click()
        cy.get('#firstName').clear().type('Joe')
        cy.get('#lastName').clear().type('Schmoe')
        cy.get('#birthdate').clear().type('07-07-1977')
        cy.get('#submit').click()
        cy.get('#error').should('contain', 'Birthdate is invalid')
        cy.get('#cancel').click()
        cy.get('#delete').click()
        cy.on('window:confirm', () => true);
    })
})
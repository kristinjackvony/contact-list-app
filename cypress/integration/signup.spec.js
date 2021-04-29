describe('Sign Up', () => {
    it('Can sign up as a new user', () => {
        const email = 'Test' + Math.floor(Math.random() * 10000) + '@fake.com'
        cy.visit('http://localhost:3000/login')
        cy.get('#signup').click()
        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('User')
        cy.get('#email').type(email)
        cy.get('#password').type('foobarfoo')
        cy.get('#submit').click()
        cy.title().should('eq', 'My Contacts')
        cy.getCookie('token').then((cookie) => {
            cy.request({
              method: 'DELETE',
              url: 'http://localhost:3000/users/me',
              headers: {'Authorization': 'Bearer ' + cookie.value}
            })
        })
    })

    it('Returns error when validation fails', () => {
      const email = 'Test' + Math.floor(Math.random() * 10000) + '@fake.com'
      cy.visit('http://localhost:3000/login')
      cy.get('#signup').click()
      cy.get('#lastName').type('User')
      cy.get('#email').type(email)
      cy.get('#password').type('foobarfoo')
      cy.get('#submit').click()
      cy.get('#error').should('contain', 'User validation failed')
    })

    it('Returns duplicate email error', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('#signup').click()
      cy.get('#firstName').type('Test')
      cy.get('#lastName').type('User')
      cy.get('#email').type('test@fake.com')
      cy.get('#password').type('foobarfoo')
      cy.get('#submit').click()
      cy.get('#error').should('contain', 'Email address is already in use')
    })

    it('Can cancel out of the Add User form', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('#signup').click()
      cy.get('#cancel').click()
      cy.title().should('eq', 'Contact List App')
  })
})
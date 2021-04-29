describe('Login', () => {
    it('Logs in with valid credentials', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('#email').type('test@fake.com')
      cy.get('#password').type('foobarfoo')
      cy.get('#submit').click()
      cy.title().should('eq', 'My Contacts')
    })

    it('Displays error message with invalid credentials', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('#email').type('test@fake.com')
      cy.get('#password').type('foobarboo')
      cy.get('#submit').click()
      cy.get('#error').should('contain', 'Incorrect username or password')
    })

    it('Logs out', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('#email').type('test@fake.com')
      cy.get('#password').type('foobarfoo')
      cy.get('#submit').click()
      cy.get('#logout').click()
      cy.title().should('eq', 'Contact List App')
    })
  })
/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('go to register page', () => {
        cy.contains('Register').click()
        cy.get('#name')
            .first()
            .type('supreme')

        cy.get('#email')
            .first()
            .type('supreme@gmail.com')

        cy.get('#password')
            .first()
            .type('123123123')

        cy.get('#register-button').first()
            .click()
    })
})

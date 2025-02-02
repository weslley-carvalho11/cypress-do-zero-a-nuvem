Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', () => {
    cy.get('input[id="firstName"]').type('Osvaldo')
    cy.get('input[id="lastName"]').type('Cruz')
    cy.get('input[id="email"]').type('osvaldocruz@gmail.com')
    cy.get('#open-text-area').type('Isso fez um texto')
    cy.get('.button').click()
})


Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
    cy.get('input[id="firstName"]').type(data.firstName)
    cy.get('input[id="lastName"]').type(data.lastName)
    cy.get('input[id="email"]').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('.button').click()
})


Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    text: 'teste.'
}) => {
    cy.get('input[id="firstName"]').type(data.firstName)
    cy.get('input[id="lastName"]').type(data.lastName)
    cy.get('input[id="email"]').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('.button').click()
})


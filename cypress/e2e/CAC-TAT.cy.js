describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Esse texto é muito longo e irá demorar muito tempo para ser digitado. Vamos ver quanto tempo o cypress irá demorar para digitar tudo isso', 10)

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva de Almeida')
    cy.get('#email').type('joao@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Exercício 3', () => {
    cy.get('input[name="phone"][id="phone"]').as('campoTelefone')
    cy.get('@campoTelefone').type('texto')
    cy.get('@campoTelefone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').type('Osvaldo')
    cy.get('input[id="lastName"]').type('Cruz')
    cy.get('input[id="email"]').type('osvaldocruz@gmail.com')
    cy.get('input[id="phone-checkbox"]').click()
    cy.get('#open-text-area').type('Isso fez um texto')
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Osvaldo')
      .should('have.value', 'Osvaldo')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Cruz')
      .should('have.value', 'Cruz')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('osvaldocruz@gmail.com')
      .should('have.value', 'osvaldocruz@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1198727272')
      .should('have.value', '1198727272')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

  })


  // it.only('envia o formuário com sucesso usando um comando customizado', () => {
  //   cy.fillMandatoryFieldsAndSubmit()

  //   cy.get('.success').should('be.visible')
  // })

  // it.only('envia o formuário com sucesso usando um comando customizado', () => {
  //   const data = {
  //     firstName: 'Nicolas',
  //     lastName: 'Souza',
  //     email: 'nicosousa@gmail.com',
  //     text: 'Teste'
  //   }
  //   cy.fillMandatoryFieldsAndSubmit(data)

  //   cy.get('.success').should('be.visible')
  // })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Usando o contains', () => {
    cy.get('#firstName').type('Osvaldo').should('have.value', 'Osvaldo')
    cy.get('#lastName').type('Cruz').should('have.value', 'Cruz')
    cy.get('#email').type('osvaldocruz@gmail.com').should('have.value', 'osvaldocruz@gmail.com')
    cy.get('#phone').type('1198727272').should('have.value', '1198727272')
    cy.get('#open-text-area').type(`Isso é um teste`).should(`have.value`, `Isso é um teste`)
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get(`#product`)
      .select(`mentoria`)
      .should(`have.value`, `mentoria`)
  })

  it(`seleciona um produto (Blog) por seu índice`, () => {
    cy.get(`#product`)
      .select(1)
      .should(`have.value`, `blog`)
  })

  it(`marca o tipo de atendimento "Feedback"`, () => {
    cy.get(`#support-type input`).check(`feedback`).should(`be.checked`)
  })

  it(`marca cada tipo de atendimento`, () => {
    cy.get(`input[type="radio"]`).each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should(`be.checked`)

    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check input[type="checkbox"]').as('checkboxs').check()
    cy.get('@checkboxs').each(checkbox => {
      expect(checkbox[0].checked).to.equal(true)
    }).last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').type('Osvaldo')
    cy.get('input[id="lastName"]').type('Cruz')
    cy.get('input[id="email"]').type('osvaldocruz@gmail.com')
    cy.get('input[id="phone-checkbox"]').check()
    cy.get('#open-text-area').type('Isso fez um texto')
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })

  // 27-01-25 (segunda)
  it('seleciona um arquivo da pasta fixture', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/e2e/anotacao.txt', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('anotacao.txt')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('novoArquivo')
    cy.get('#file-upload')
      .selectFile('@novoArquivo')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank').and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})


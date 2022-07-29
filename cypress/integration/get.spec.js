

describe('GET /characters', () => {

    context('quando realiza uma busca por', () => {

        before(() => {
            cy.setToken()
        })

        it('lista, deve retornar uma lista de personagens cadastrados', () => {
            cy.getCharacters()
                .then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.be.a('array')
                })
        })
    })
})
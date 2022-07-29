

describe('GET /characters', () => {

    context('quando realiza uma busca por', () => {

        const characters = [
            {
                name: 'Charles Xavier',
                alias: 'Professor X',
                team: ['X-Men'],
                active: true
            },
            {
                name: 'Logan',
                alias: 'Wolverine',
                team: ['X-Men'],
                active: true
            },
            {
                name: 'Peter Parker',
                alias: 'Homem-Aranha',
                team: ['Novos Vingadores'],
                active: true
            }
        ]

        before(() => {
            cy.back2ThePast()
            cy.setToken()
            cy.populateCharacters(characters)
        })

        it('lista, deve retornar uma lista de personagens cadastrados', () => {
            cy.getCharacters()
                .then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.be.a('array')
                    expect(response.body.length).to.greaterThan(0)
                })
        })

        it('nome, deve retornar o personagem buscado', () => {
            cy.searchCharacters('Logan')
                .then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.length).to.eql(1)
                    expect(response.body[0].alias).to.eql('Wolverine')
                    expect(response.body[0].team).to.eql(['X-Men'])
                    expect(response.body[0].active).to.eql(true)
                })

        })
    })
})
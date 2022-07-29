

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

describe('GET /character/id', () => {

    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: [
            'Vingadores'
        ],
        active: true
    }

    context('quando há um personagem cadastrado', () => {

        before(() => {
            cy.postCharacter(tonyStark)
                .then((response) => {
                    Cypress.env('characterId', response.body.character_id)
                })
        })

        it('deve buscar o personagem pelo id', () => {

            const id = Cypress.env('characterId')
            cy.getCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.alias).to.eql('Homem de Ferro')
                    expect(response.body.team).to.eql(['Vingadores'])
                    expect(response.body.active).to.eql(true)
                })
        })
    })

    context('quando tenta buscar por id inexistente', () => {

        it('deve retornar status code 404', () => {
            const id = '62e45de09a8304a30105e2df'
            cy.getCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(404)
                })
        })
    })
})
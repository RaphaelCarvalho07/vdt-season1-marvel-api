

describe('DELETE /characters/id', () => {

    before(() => {
        cy.setToken()
    })

    const tochaHumana = {
        name: 'Johnny Storm',
        alias: 'Tocha Humana',
        team: [
            'Quarteto Fantástico'
        ],
        active: true
    }

    context('quando há um personagem cadastrado', () => {

        before(() => {
            cy.postCharacter(tochaHumana)
                .then((response) => {
                    Cypress.env('characterId', response.body.character_id)
                })
        })

        it('deve remover o personagem pelo id', () => {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(204)
                })
        })

        after(() => {
            const id = Cypress.env('characterId')
            cy.getCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(404)
                })
        })

    })

    context('quando tenta remover por id inexistente', () => {

        it('deve retornar status code 404', () => {
            const id = '62e45de09a8304a30105e2df'
            cy.deleteCharacterById(id)
                .then((response) => {
                    expect(response.status).to.eql(404)
                })
        })
    })
})
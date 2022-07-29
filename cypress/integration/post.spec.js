

describe('POST /characters', () => {

    context('quando o personagem é novo', () => {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escalarte',
            team: ['vingadores'],
            active: true
        }

        it('deve conseguir cadastrar', () => {

            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        })
    })

    context('quando um personagem já existe', () => {

        const character = {
            name: 'Pieto Maximoff',
            alias: 'Mercurio',
            team: ['Vingadores da Costa Oeste', 'Irmandado dos Mutantes'],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(201)
                })
        })

        it('não deve cadastrar duplicado', () => {

            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })
})
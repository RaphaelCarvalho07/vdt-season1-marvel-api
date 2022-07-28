

describe('POST /characters', () => {

    before(() => {
        cy.request({
            method: 'POST',
            url: '/sessions',
            body: {
                email: 'koi@qacademy.io',
                password: 'qa-cademy'
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })

    it('deve cadastrar um personagem', () => {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escalarte',
            team: ['vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then((response) => {
            expect(response.status).to.eql(201)
        })
    })
})
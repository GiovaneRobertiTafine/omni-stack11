const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    // Metodo para fazer algo antes dos testes
    beforeEach(async () => {
        await connection.migrate.rollback(); 
        await connection.migrate.latest(); // Executar as criações da migrations pelo código
    });

    // Metodo para fezer algo depois que tudo acabar
    afterAll(async () => {
        await connection.destroy();
    })

    it('Should be able ti create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD3",
            email: "contat@asd.com",
            whatsapp: "1234567890g",
            city: "Ferraz",
            uf: "SP"
        });
        // Se precisa verificar algo que estar no header
        // coloca o metodo 
        // .set('Authorization', 'asdasd')

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
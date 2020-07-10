const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
    it('should generate an unique id', () => {
        // expect(2 + 2).toBe(5) Espera que 2 + 2 seja 5, gera um fail, ao iniciar o npm test

        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});
const { customId, isCustomId } = require('./app');

describe('main', () => {
    test('Is it valid', (done) => {
        const id = customId();

        expect(id).not.toBe(undefined);
        expect(isCustomId(id)).toBe(true);
        expect(isCustomId('5555AAAA')).toBe(false);
        expect(isCustomId('AAAA2')).toBe(false);
        expect(isCustomId(null)).toBe(false);
        done();
    })
});

var cryptoRandom = require('math-random');

const NUMBER_LENGTH = 4;
const LETTER_LENGTH = 4;
const TOTAL_LENGTH = LETTER_LENGTH + NUMBER_LENGTH;

function idGenerate() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (typeof length !== 'number') throw new Error('length must be a number');
    if (typeof scope !== 'string') throw new Error('scope must be a string');
    var str = '';
    var l = scope.length;

    for (var i = 0; i < length; i++) {
        str += scope.charAt(Math.floor(Math.random() * l));
    }

    return str;
}

function between(min, max) {
    if (min >= max) throw { success: false, message: 'Internal error : between' };
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

function customId() {
    const multiply = between(11111, 99999);
    const crypticNotSecure = Math.floor(Math.random() * multiply);
    const crypticSecureFun = cryptoRandom() * multiply;
    const crypticSecure = Math.floor(crypticSecureFun);

    const letters = idGenerate(LETTER_LENGTH, 'ABCDEFGHIJKLMNOPQRSTUVXYZ');
    const numbers = idGenerate(NUMBER_LENGTH, crypticSecure.toString() || crypticNotSecure.toString());

    const result = letters + numbers;
    return result.toUpperCase();
};

/** New customId is 4 letters and 4 numbers */
function isCustomId(id) {
    return (typeof id === 'string' && id.length === TOTAL_LENGTH
        && /^[a-zA-Z]+$/.test(id.substring(0, LETTER_LENGTH))
        && /^[0-9]+$/.test(id.substring(LETTER_LENGTH, TOTAL_LENGTH))) || isOldCustomId(id)
}

/** Old customId is 3 letters and 3 numbers */
function isOldCustomId(id) {
    return typeof id === 'string' && id.length === 6
        && /^[a-zA-Z]+$/.test(id.substring(0, 3))
        && /^[0-9]+$/.test(id.substring(3, 6))
}

module.exports = {
    customId,
    isCustomId
}
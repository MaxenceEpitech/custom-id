"use strict";
var cryptoRandom = require("math-random");

function idGenerate() {
    var length =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
    var scope =
        arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (typeof length !== "number") throw new Error("length must be a number");
    if (typeof scope !== "string") throw new Error("scope must be a string");
    var str = "";
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

module.exports = function customId() {
    const multiply = between(11111, 99999);
    const crypticNotSecure = Math.floor(Math.random() * multiply);
    const crypticSecureFun = cryptoRandom() * multiply;
    const crypticSecure = Math.floor(crypticSecureFun);

    const numbers = idGenerate(4, crypticSecure.toString() || crypticNotSecure.toString());
    const letters = idGenerate(4, "ABCDEFGHIJKLMNOPQRSTUVXYZ");

    const result = letters + numbers;
    return result.toUpperCase();
};
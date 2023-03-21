import { customAlphabet } from "nanoid";
const numerals = "0123456789";
const alphaNumeric = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const pickElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};
module.exports = {
    make20AlphaNumericId: customAlphabet(alphaNumeric, 20),
    makeTenNumericId: customAlphabet(numerals, 10),
    pickElement,
};
//# sourceMappingURL=seed.helpers.js.map
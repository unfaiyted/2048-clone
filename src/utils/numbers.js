/**
 * percentChanceBoolean
 *
 * Returns true or false at a given percent chance of being true
 * @param percentInDecimal
 * @returns {boolean}
 */
export const percentChanceBoolean = (percentInDecimal = 0.4) => {
    return  Math.random() < percentInDecimal; // 40% probabiltiy
}

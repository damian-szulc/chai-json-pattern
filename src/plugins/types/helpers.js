
/**
 * Determines wheter num is positive and safe integer
 * @param {any} num
 */
export const positiveSafeInteger = num =>
    Number.isSafeInteger(num) && num >= 0;

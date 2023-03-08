/**
 * Generate a random ID of a given length
 * @param {number} length 
 * @returns {string}
 */

export const generateRandomId = function(length=6){
    return Math.random().toString(36).slice(1+length)
};
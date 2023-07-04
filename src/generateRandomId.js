/**
 * Generate a random ID of a given length, to be used for collaborative instrument demo pages
 * @param {number} length 
 * @returns {string}
 */

export const generateRandomId = function(length=6){
    return Math.random().toString(36).slice(1+length)
};
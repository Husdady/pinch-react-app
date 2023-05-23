/**
 * Add zero at start to a number
 * @param {number} num Number for format 
 * @returns {string} Number
 */
export default function addZeroToNumber(num) {
  // Validate typeof of the 'num' param
  if (typeof num !== 'number') return ''

  // Num is less than 10 but greater than 0
  if (num > 0 && num < 10) {
    return num.toString().padStart(2, '0');
  }

  // Return num
  return num.toString();
}
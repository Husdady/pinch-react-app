/**
 * Check if two arrays are equal
 * @param {Array} array Array for compare
 * @param {Array} array2 Array for compare
 * @returns {boolean} Boolean
 */
export default function checkIfAreEqualArray(array, array2) {
  if (!Array.isArray(array)) return false;
  if (!Array.isArray(array2)) return false;

  // Check array length
  if (array.length !== array2.length) return false;

  return array.every(
    (obj, index) => JSON.stringify(obj) === JSON.stringify(array2[index])
  );
}

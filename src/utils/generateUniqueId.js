export const ID_DIGITS = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

/**
 * Generate unique id
 * @returns {string} ID
 */
export default function generateUniqueId() {
  return ID_DIGITS.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

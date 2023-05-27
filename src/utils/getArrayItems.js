/**
 * Get items from array
 * @param {object} params Receive a 'field', 'data' and 'items'
 * @returns {object} Array
 */
export default function getArrayItems({ field, data, items }) {
  if (typeof field !== 'string') return [] // Return empty array
  if (!Array.isArray(data)) return [] // Return empty array
  if (!Array.isArray(items)) return [] // Return empty array

  // Filter items
  const filteredItems = data.filter((item) => {
    return items.includes(item[field])
  })

  return filteredItems
}
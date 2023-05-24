/**
 * Get last month
 * @param {object} params Total months
 * @returns {Date} Date
 */
export function getLastMonth({ totalMonths }) {
  let lastDate = null; // Define last date
  const today = new Date(); // Get current date

  for (let i = 0; i <= totalMonths; i++) {
    // Get last month in 'x' month next
    lastDate = new Date(today.getFullYear(), today.getMonth() + i + 1, 0);
  }

  return lastDate;
}

/**
 * Get last month in next dates
 * @param {object} params Total months and date
 * @returns {boolean} Boolean
 */
export default function getMaxMonthInNextDates({ date = new Date(), totalMonths }) {
  const lastMonth = getLastMonth({ totalMonths: totalMonths }); // Get last month

  const day = lastMonth.getDate(); // Define day
  const month = lastMonth.getMonth(); // Define month
  const year = lastMonth.getFullYear(); // Define year

  const maxDate = new Date(year, month, day); // Define the max date
  return date <= maxDate
}

// Utils
import addZeroToNumber from "../../../../utils/addZeroToNumber";

export const MONTHS_LIMIT = 2;

export const monthsList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month) => month.toUpperCase());

/**
 * Get month by name
 * @param {string} month Month
 * @returns {string} Month
 */
export function getMonthByName(month) {
  return monthsList[month];
}

/**
 * Get month index
 * @param {string} month Month
 * @returns {string} Month
 */
export function getMonthIndex(month) {
  // Get month index
  const index = monthsList
    .map((item) => item.toLowerCase())
    .findIndex((item) => item === month);

    // Index not found
  if (index === -1) return 0

  return addZeroToNumber(index + 1)
}

/**
 * Get current month
 * @returns {string} Month
 */
export function getCurrentMonth() {
  const currentDate = new Date(); // Get current date
  const currentMonth = currentDate.getMonth(); // Get current month

  // Get current month name
  const currentMonthName = getMonthByName(currentMonth);
  return currentMonthName.toLowerCase();
}

/**
 * Get current month and the 2 next months
 */
export function getMonths() {
  const months = []; // Define months
  const currentDate = new Date(); // Get current date
  const currentMonth = currentDate.getMonth(); // Get current month

  // Get current month name
  const currentMonthName = getMonthByName(currentMonth);

  // Add month
  months.push({
    value: currentMonthName.toLowerCase(),
    label: currentMonthName,
  });

  // Get next months
  for (var i = 1; i <= MONTHS_LIMIT; i++) {
    const nextMonth = (currentMonth + i) % 12; // Get next month
    const item = getMonthByName(nextMonth); // Get month name

    // Add next month
    months.push({
      value: item.toLowerCase(),
      label: item,
    });
  }

  return months;
}

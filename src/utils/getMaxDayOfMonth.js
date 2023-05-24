// Utils
import getCurrentDate from "./getCurrentDate";

export const { today } = getCurrentDate() // Get current date

/**
 * Get max day of month
 * @param {number} month Month 
 * @param {number} year Year
 * @returns {number} Day
 */
export default function getMaxDayOfMonth(month, year = today.getFullYear()) {
  // Create date of month base
  const date = new Date(year, month - 1, 1);
  
  // Increment month
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);
  
  const maxDay = date.getDate(); // Get max day of month
  return maxDay;
}

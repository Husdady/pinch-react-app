// Utils
import { monthsList } from "../Months/utils";

const todayDate = new Date() // Get current date
const options = { weekday: "long" }; // Get long name of the day
const months = monthsList.map((month) => month.toLowerCase()) // All months to lowercase

/**
 * Get current day
 * @returns {number} Day
 */
export function getCurrentDay() {
  const today = new Date(); // Get current date
  return today.getDate();
}

/**
 * Get day name
 * @param {object} params Receive a day (number) and month (string) 
 * @returns {string} Day name
 */
export function getDayName({ day, month }) {
  const today = new Date(); // Get current date

  // Get month index
  const index = months.findIndex((item) => item === month)

  // Month not found
  if (index === -1) return today.toLocaleDateString("en-EN", options);

  today.setDate(Number(day)); // Define day
  today.setMonth(index); // Define month

  return today.toLocaleDateString("en-EN", options);
}

/**
 * Get max day of a month
 * @param {string} month Receive a short month name 
 * @returns {number} Max day of a month
 */
export function getMaxDayOfMonth(month) {
  // Get month index
  const index = months.findIndex((item) => item === month)

  // Month not found
  if (index === -1) return todayDate.getDate();
  
  // Get max month
  const today = new Date(todayDate.getFullYear(), index + 1, 0);

  // Return max day
  return today.getDate();
}

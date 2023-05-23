// Utils
import getCurrentDate from "./getCurrentDate";

/**
 * Validate if the current hour is in a range
 * @param {string} hourRange Hour range 
 * @returns {boolean} Boolean
 */
export default function validateHourRange(hourRange) {
  const { today, dateString } = getCurrentDate(); // Get current date
  const hours = hourRange.split(' - '); // Split range

  const endHour = new Date(`${dateString} ${hours[1]}`); // Get end hour
  const startHour = new Date(`${dateString} ${hours[0]}`); // Get start hour
  endHour.setMinutes(endHour.getMinutes() + 1) // Increment one minute to end hour
  
  return today >= startHour && today <= endHour
}

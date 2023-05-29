// Utils
import getCurrentDate from "./getCurrentDate";
import getHoursAndMinutes from "./getHoursAndMinutes";

/**
 * Validate if the current hour is in a range
 * @param {string} hourRange Hour range
 * @returns {boolean} Boolean
 */
export default function validateHourRange(hourRange) {
  if (typeof hourRange !== "string") return hourRange;
  const { today } = getCurrentDate(); // Get current date
  const hours = hourRange.split(" - "); // Split range

  const endHourRange = getHoursAndMinutes(hours[1]); // Get end hour and minutes
  const firstHourRange = getHoursAndMinutes(hours[0]); // Get first hour and minutes

  // Define the start hour
  const startHour = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    firstHourRange.hour,
    firstHourRange.minutes
  );

  // Define the end hour
  const endHour = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    endHourRange.hour,
    endHourRange.minutes
  );

  return today >= startHour && today <= endHour;
}

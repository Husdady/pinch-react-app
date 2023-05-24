// Utils
import addZeroToNumber from "./addZeroToNumber";

/**
 * Get day by index
 * @param {number} day Weekday
 * @returns {Date} Date
 */
export function getDay(day) {
  const currentDate = new Date();
  const currentWeekday = currentDate.getDay(); // Get weekday
  
  // Calculate day diff
  const diff = day - currentWeekday;
  currentDate.setDate(currentDate.getDate() + diff);
  
  return currentDate;
}

/**
 * Get specific day of weekday
 * @param {number} day Weekday
 * @returns {object} Object
 */
export function getSpecificWeekday(day) {
  const weekday = getDay(day); // Get day

  const newDay = weekday.getDate(); // Define day
  const month = weekday.getMonth(); // Define month
  const year = weekday.getFullYear(); // Define year

  const weekDayDate = new Date(year, month, newDay); // Define the date

  return {
    date: weekDayDate,
    jobDate: addZeroToNumber(newDay) + '/' + addZeroToNumber(month)
  }
}

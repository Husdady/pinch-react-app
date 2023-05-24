// Utils
import { getMonthIndex } from "../Months/utils";
import createList from "../../../../utils/createList";
import { getDayName, getMaxDayOfMonth } from "../OneTime/utils";
import getCurrentDate from "../../../../utils/getCurrentDate";
import addZeroToNumber from "../../../../utils/addZeroToNumber";

// Constants
import { maxItemsInCalendar } from "./constants";
import { daysOptions } from "../RecurrentJobs/constants";

export const { today } = getCurrentDate();

/**
 * Calculate the total days of a month
 * @param {object} params Receive a month
 * @param {Array<object>} Array Returns a days
 */
export default function calculateMonthDays({ month }) {
  const calculatedDays = maxItemsInCalendar.slice(); // Create copy of max calendar items
  const monthIndex = getMonthIndex(month); // Get month index: 04, 05, 06
  const daysOfMonth = createList(getMaxDayOfMonth(month)); // Get total days of month

  // Define days
  const days = daysOfMonth.map((i) => {
    const year = today.getFullYear(); // Get current year
    const day = getDayName({ day: i, month: month }); // Get day of calendar
    const jobDate = `${addZeroToNumber(i)}/${monthIndex}`; // Define the job date
    const date = `${jobDate}/${year}`; // Define complete date 24/05/2023

    return {
      index: i,
      day: day,
      date: date,
      month: month,
      jobDate: jobDate,
      dateObject: new Date(year, Number(monthIndex) - 1, i + 1),
      shortDay: day.toLowerCase(),
    };
  });

  const firstDay = days[0]; // Get first day

  // Get index of first day
  const firstDayIndex = daysOptions.findIndex(
    (item) => item.id === firstDay.shortDay
  );

  let i = 0; // Define count
  let index = firstDayIndex; // Define index

  // Generate while 'bucle'
  while (index < maxItemsInCalendar.length) {
    const day = days[i]; // Get day

    // Validate existing day
    if (typeof day !== "undefined") {
      calculatedDays[index] = days[i]; // Update day for calendar
    }

    // Stop bucle if index is greater than max items of the calendar
    if (index > maxItemsInCalendar) {
      break;
    }

    i++; // Increase count
    index++; // Increase index
  }

  // Filter days not added to calendar
  const filterNotAddedDays = days.filter(
    (day) =>
      !calculatedDays.some((item) => item !== null && item.index === day.index)
  );

  // Add days into start position of the calendar
  for (let k = 0; k < filterNotAddedDays.length; k++) {
    calculatedDays[k] = filterNotAddedDays[k]; // Update days
  }

  return calculatedDays;
}

// Utils
import getCurrentDate from "../../../../utils/getCurrentDate";
import generateUniqueId from "../../../../utils/generateUniqueId";
import getHoursAndMinutes from "../../../../utils/getHoursAndMinutes";

export const TOTAL_MIN_DAY = 1440; // Define max minutes
export const DIFF_MINUTES_INIT_HOUR = 30; // Define diff of minutes for the init hour

/**
 * Define a options for job time. Example: 00:30 AM - 01:00 AM
 * @param {number} time Different time
 */
export function createTimeOptions({ time, day, month }) {
  if (typeof time !== "number") return [];
  if (time === 0) return [];
  if (typeof day !== "number") return [];
  if (typeof month !== "number") return [];

  let mins = 0; // Define minutes
  const hours = []; // Define hours

  const initDate = new Date(); // Set default init date
  const lastDate = new Date(); // Set default last date
  const { today } = getCurrentDate(); // Get current date
  const currentDay = today.getDate(); // Get current day index
  const currentMonth = today.getMonth() + 1; // Get current month index
  const currentHours = today.getHours(); // Get current hours
  const currentMinutes = today.getMinutes(); // Get current minutes

  initDate.setHours(0, 0, 0, 0); // Set default hours to init date
  lastDate.setHours(0, 0, 0, 0); // Set default hours to last date

  // Iterate mins if is less than total mins in a day
  while (mins < TOTAL_MIN_DAY) {
    let disabled = false;

    // Get init hour
    const initHour = initDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Add default minutes to init date
    initDate.setMinutes(initDate.getMinutes() + DIFF_MINUTES_INIT_HOUR);

    // Get last minutes of the last date
    const lastMinutes = lastDate.getMinutes();

    // Add 'x' minutes to  last date
    lastDate.setMinutes(
      mins === 0 ? lastMinutes + time : lastMinutes + DIFF_MINUTES_INIT_HOUR
    );

    // Get end hour
    const endHour = lastDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Define init
    const init = mins < 100 ? initHour.replace(/12/, "00") : initHour;

    // Define end
    const end =
      mins < 100
        ? endHour.replace(/12/, "00") // Replace 12:00 AM to 00:00 AM
        : endHour; // Replace 12:00 AM to 12:00 PM

    const diff = init + " - " + end; // Define diff hours

    mins += DIFF_MINUTES_INIT_HOUR; // Increase mins

    const dateTime = getHoursAndMinutes(initHour);

    // console.log({ DAY: day, CURRENT_DAY: currentDay });

    // Its Current day
    if (currentMonth === month && currentDay === day) {
      // console.log({
      //   'dateTime.HOUR': dateTime.hour,
      //   'CURRENT_HOUR': currentHours,
      //   'CURRENT_MINUTES': currentMinutes,
      //   'dateTime.MINUTES': dateTime.minutes,
      // });
      // Define flag for validate if the current time (hours and minutes) are less than for time option
      const isLessThanCurrentTime =
        dateTime.hour <= currentHours && currentMinutes > dateTime.minutes;

      // Hours and minutes are less than current time
      if (isLessThanCurrentTime) {
        disabled = true;
      }
    }

    // Add hour
    hours.push({
      disabled: disabled,
      value: generateUniqueId(),
      label: diff,
    });
  }

  return hours;
}

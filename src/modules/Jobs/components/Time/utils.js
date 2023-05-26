// Utils
import generateUniqueId from "../../../../utils/generateUniqueId";

export const TOTAL_MIN_DAY = 1440; // Define max minutes
export const DIFF_MINUTES_INIT_HOUR = 30; // Define diff of minutes for the init hour

/**
 * Define a options for job time. Example: 00:30 AM - 01:00 AM
 * @param {number} time Different time
 */
export function createTimeOptions(time) {
  if (typeof time !== "number") return [];
  if (time === 0) return [];

  // Crear el array vacío
  let mins = 0; // Define minutes
  const hours = []; // Define hours

  const initDate = new Date(); // Set default init date
  const lastDate = new Date(); // Set default last date

  initDate.setHours(0, 0, 0, 0); // Set default hours to init date
  lastDate.setHours(0, 0, 0, 0); // Set default hours to last date

  // Iterate mins if is less than total mins in a day
  while (mins < TOTAL_MIN_DAY) {
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
    hours.push({ value: generateUniqueId(), label: diff }); // Add hour
  }

  return hours;
}

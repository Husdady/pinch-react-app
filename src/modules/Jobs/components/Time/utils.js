// Utils
import generateUniqueId from "../../../../utils/generateUniqueId";

export const TOTAL_MIN_DAY = 1440; // Define max minutes

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

  const hora = new Date(); // Set default hour
  hora.setHours(0, 0, 0, 0); // Set default hours

  // Iterate mins if is less than total mins in a day
  while (mins < TOTAL_MIN_DAY) {
    // Get init hour
    const initHour = hora.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    hora.setMinutes(hora.getMinutes() + time); // Add 30 minutes to current hour

    // Get end hour
    const endHour = hora.toLocaleString("en-US", {
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

    mins += time; // Increase mins
    hours.push({ value: generateUniqueId(), label: diff }); // Add hour
  }

  return hours;
}

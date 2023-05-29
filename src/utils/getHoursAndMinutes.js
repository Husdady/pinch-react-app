// Constants
export const MAX_HOUR = 24;

/**
 * Get hours and minutes for time string '02:00 PM'
 * @param {string} time Time
 * @returns {object} Object
 */
export default function getHoursAndMinutes(time) {
  if (typeof time !== "string") return {};

  const values = time.split(":"); // Split time '02:00 PM' => ['02', '00 PM']
  if (values.length === 0) return {}; // Validate length

  const hourValue = values[0]; // Get hour '02'
  const minutes = Number(values[1].split(" ")[0]); // Get minutes '00'
  if (isNaN(minutes)) return {}; // Validate minutes

  let hour = Number(hourValue); // Define hour
  const isAm = time.includes("AM"); // Check if its is AM

  // Validate hour for 24 time
  if (isAm && hourValue === "12") {
    hour = MAX_HOUR;
  }

  // Validate hour for 12 time in PM
  if (!isAm && hourValue !== "12") {
    hour = hour + MAX_HOUR / 2;
  }

  return {
    hour: hour,
    minutes: minutes,
  };
}

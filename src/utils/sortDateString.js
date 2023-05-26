/**
 * Sort date string in format '[{ jobDate: '02/16', jobTime: '02/16\n12:00 PM' }]
 * @param {Array<object>} dateStrings Date string '[{ jobDate: '02/16', jobTime: '02/16\n12:00 PM' }]'
 * @returns {Array<object>} Array object
 */
export default function sortDateString(dateStrings) {
  // Step 1: Convert date strings to Date objects
  const dates = dateStrings.map((dateString) => {
    const [month, day] = dateString.jobDate.split("/");
    const year = new Date().getFullYear(); // Get current year
    const fullDate = new Date(`${month}/${day}/${year}`);
    return { ...dateString, fullDate: fullDate };
  });

  // Step 2: Sort the array of dates
  dates.sort((a, b) => a.fullDate - b.fullDate);

  // Step 3: Convert the sorted dates back to date strings
  const sortedDateStrings = dates.map((job) => {
    const month = job.jobDate.substr(0, 2); // Get month
    const day = job.jobDate.substr(3, 2); // Get day
    return { jobDate: `${month}/${day}`, jobTime: job.jobTime };
  });

  return sortedDateStrings;
}

// Constants
import { daysOptions } from "../RecurrentJobs/constants";

export function getSortedDays() {
  const days = daysOptions.slice()
  
  const lastDay = days.pop(); // Remove last item
  days.unshift(lastDay); // Insert last item in first position
  
  return days;
}
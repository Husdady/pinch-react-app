// Utils
import { getDayName } from "../NewJob/Booking/OneTime/utils";
import { getCurrentMonth } from "../NewJob/Booking/OneTime/Months/utils";

// Constants
export const today = new Date(); // Get current date
export const DEFAULT_TOTAL_MONTHS = 1; // Define default total months
export const DEFAULT_FIRST_HOUR = "00:00 AM"; // Define default first hour of day
export const day = today.getDate(); // Get current day
export const month = getCurrentMonth(); // Get current month
export const dayName = getDayName({ day: day, month: month }).toLowerCase(); // Get day name

export const repeatValues = {
  weekly: 7,
  biweekly: 14,
  monthly: 30,
};

export const DEFAULT_VALUES = {
  minimizeWidth: false,
  clientId: "",
  customerName: "",
  showCreateJobModal: false,
  propertyId: "",
  jobDate: "",
  jobTime: "",
  jobCost: null,
  jobDurationTime: null,
  propertyName: "",
  services: [],
  serviceId: "",
  serviceType: "",
  booking: "",
  timeId: "",
  timeOptions: [],
  month: month,
  day: day,
  repeat: "weekly",
  forMonthly: "1-month",
  days: [dayName],
  appointments: [],
};

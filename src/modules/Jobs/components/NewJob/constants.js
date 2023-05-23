// Utils
import { getCurrentMonth } from "../Months/utils";

// Constants
export const LEFT_ARROW = "https://i.imgur.com/IckyjBc.png";
export const RIGHT_ARROW = "https://i.imgur.com/oPf0hob.png";

export const today = new Date() // Get current day
export const DEFAULT_FIRST_HOUR = '00:00 AM' // Get first hour of day

export const DEFAULT_VALUES = {
  minimizeWidth: false,
  clientId: '',
  customerName: '',
  propertyId: '',
  jobDate: '',
  jobTime: '',
  jobCost: null,
  jobDurationTime: null,
  propertyName: '',
  services: [],
  serviceId: '',
  serviceType: '',
  booking: '',
  timeId: '',
  timeOptions: [],
  month: getCurrentMonth(),
  day: today.getDate(),
  repeat: 'weekly',
  forMonthly: '1-month',
  days: [],
  appointments: []
}

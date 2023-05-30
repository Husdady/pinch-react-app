// Constants
import isObject from "../../../../utils/isObject";
import { STATUS, PAYMENT_TYPE } from "../ModalCreateJob/constants";

/**
 * Parse appointments information
 * @param {object} params Receive formState and appointments
 * @returns {Array<object>} Appointments
 */
export function parseAppointments({
  appointments,
  notifications,
  confirmation,
  confirmationBy,
}) {
  return appointments.map((appointment) => ({
    serviceType: appointment.serviceType,
    clientId: appointment.clientId,
    jobTime: appointment.jobTime,
    customerName: appointment.customerName,
    jobDurationTime: appointment.jobDurationTime,
    jobDate: appointment.jobDate,
    paymentType: PAYMENT_TYPE,
    dateTime: appointment.dateTime,
    propertyId: appointment.propertyId,
    confirmationBy: confirmationBy,
    status: STATUS,
    jobCost: appointment.jobCost,
    propertyName: appointment.propertyName,
    notifications: notifications,
    confirmation: confirmation,
  }));
}

/**
 * Compare two time options
 * @param {Array} timeOptions Current time options
 * @param {Array} newTimeOptions New time options
 * @returns {boolean} Boolean
 */
export function compareTimeOptions(timeOptions, newTimeOptions) {
  if (!Array.isArray(timeOptions)) return false; // Stop function
  if (!Array.isArray(newTimeOptions)) return false; // Stop function

  // Not equal time options
  if (timeOptions.length !== newTimeOptions.length) return false;

  return !(timeOptions.every((option, index) => {
    const newOption = newTimeOptions[index];

    if (isObject(option) && isObject(newOption)) {
      return option.disabled === newOption.disabled;
    }

    return false;
  }));
}

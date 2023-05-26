// Constants
import { STATUS, PAYMENT_TYPE } from "./constants";

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

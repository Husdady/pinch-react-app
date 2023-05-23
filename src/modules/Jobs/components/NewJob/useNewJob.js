/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useForm } from "react-hook-form";
import { useRef, useCallback } from "react";

// Utils
import isObject from "../../../../utils/isObject";
import addZeroToNumber from "../../../../utils/addZeroToNumber";
import { getCurrentMonth, getMonthIndex } from "../Months/utils";
import { getCurrentDay, getMaxDayOfMonth } from "../OneTime/utils";
import { createTimeOptions } from "../Time/utils";

// Constants
import { bookingOptions } from "../Booking/options";
import { DEFAULT_VALUES, DEFAULT_FIRST_HOUR } from "./constants";
import validateHourRange from "../../../../utils/validateHourRange";

/**
 * Hook that implemenets the logic of the NewJob component
 * @returns {object} Object
 */
export default function useNewJob() {
  const ref = useRef(null);

  // Define form state
  const { watch, register, setValue } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  // Callback 'change' for update Select field
  const handleOnChange = useCallback((field) => {
    return (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      setValue(field, option.value); // Update field
    };
  }, []);

  // Callback 'change' for update Client
  const onChangeClient = useCallback(
    ({ clientId, customerName }) => {
      setValue("clientId", clientId); // Update field 'clientId'
      setValue("customerName", customerName); // Update field 'customerName'

      const appointments = watch("appointments"); // Get appointments

      // Define client structure
      const client = { clientId: clientId, customerName: customerName };

      // Empty Appointments
      if (appointments.length === 0) {
        return setValue("appointments", [client]);
      }

      // Update Client for each appointment
      return setValue(
        "appointments",
        appointments.map((appointment) => ({
          ...appointment,
          ...client,
        }))
      );
    },
    [watch("appointments")]
  );

  // Callback 'change' for update Property
  const onChangeProperty = useCallback(
    ({
      propertyId,
      propertyName,
      jobCost,
      jobDurationTime,
      serviceId,
      serviceType,
      services,
    }) => {
      setValue("services", services); // Update field 'services'
      setValue("serviceId", serviceId); // Update field 'serviceId'
      setValue("serviceType", serviceType); // Update field 'serviceType'
      setValue("propertyId", propertyId); // Update field 'propertyId'
      setValue("propertyName", propertyName); // Update field 'propertyName'
      setValue("booking", bookingOptions[0].value); // Set first option of Booking options
      setValue("jobDurationTime", jobDurationTime); // Update field 'jobDurationTime'
      setValue("jobCost", jobCost); // Update field 'jobCost'

      let jobTime = "";
      let dateTime = "";
      const day = watch("day"); // Get day
      const month = watch("month"); // Get month
      const appointments = watch("appointments"); // Get appointments

      // Define job date
      const jobDate = addZeroToNumber(day) + "/" + getMonthIndex(month);
      setValue("jobDate", jobDate); // Update job date

      // Define time options
      const timeOptions = createTimeOptions(jobDurationTime);
      setValue("timeOptions", timeOptions); // Update field 'timeOptions'

      // Get time option
      const timeOption = timeOptions.find((item) =>
        validateHourRange(item.label)
      );

      // Time option found
      if (typeof timeOption !== "undefined") {
        const label = timeOption.label;
        const splitHours = label?.split(" - ");

        jobTime = Array.isArray(splitHours)
          ? splitHours[0]
          : DEFAULT_FIRST_HOUR;

        dateTime = `${jobDate}\n${jobTime}`;

        setValue("jobTime", jobTime); // Update field 'timeId'
        setValue("timeId", timeOption.value); // Update field 'timeId'
        setValue("dateTime", dateTime); // Update field 'dateTime'
      }

      // Define property structure
      const property = {
        jobCost: jobCost,
        jobDate: jobDate,
        jobTime: jobTime,
        dateTime: dateTime,
        propertyId: propertyId,
        propertyName: propertyName,
        serviceType: serviceType,
        jobDurationTime: jobDurationTime,
      };

      // Empty Appointments
      if (appointments.length === 0) {
        return setValue("appointments", [property]);
      }

      // Update Property for each appointment
      return setValue(
        "appointments",
        appointments.map((appointment) => ({
          ...appointment,
          ...property,
        }))
      );
    },
    [watch("day"), watch("month"), watch("appointments")]
  );

  // Callback 'change' for update Service
  const onChangeService = useCallback(
    ({ jobCost, jobDurationTime, serviceId, serviceType }) => {
      setValue("serviceId", serviceId); // Update field 'serviceId'
      setValue("serviceType", serviceType); // Update field 'serviceType'
      setValue("jobDurationTime", jobDurationTime); // Update field 'jobDurationTime'
      setValue("jobCost", jobCost); // Update field 'jobCost'

      const booking = watch("booking"); // Get booking
      const appointments = watch("appointments"); // Get appointments

      // Define time options
      const timeOptions = createTimeOptions(jobDurationTime);
      setValue("timeOptions", timeOptions); // Update field 'timeOptions'

      // Get time option
      const timeOption = timeOptions.find((item) =>
        validateHourRange(item.label)
      );

      // Time option found
      if (typeof timeOption !== "undefined") {
        setValue("timeId", timeOption.value); // Update field 'timeId'
      }

      // Set first booking option
      if (booking === "" && isObject(bookingOptions[0])) {
        setValue("booking", bookingOptions[0].value);
      }

      // Define service structure
      const service = {
        jobCost: jobCost,
        serviceId: serviceId,
        serviceType: serviceType,
        jobDurationTime: jobDurationTime,
      };

      // Empty Appointments
      if (appointments.length === 0) {
        return setValue("appointments", [service]);
      }

      // Update Service for each appointment
      return setValue(
        "appointments",
        appointments.map((appointment) => ({
          ...appointment,
          ...service,
        }))
      );
    },
    [watch("booking"), watch("appointments")]
  );

  // Callback 'click' for toggle days
  const onToggleDay = useCallback(
    (dayId) => {
      const daysId = watch("days"); // Get days
      const existsDayId = daysId.includes(dayId); // Check if dayId has been included

      // DayId already exists
      if (existsDayId) {
        // Update days
        return setValue(
          "days",
          daysId.filter((item) => item !== dayId)
        );
      }

      // Update days
      return setValue("days", [dayId, ...daysId]);
    },
    [watch("days")]
  );

  // Callback 'change' for update property and services
  const onChangeMonth = useCallback(
    (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      const month = option.value; // Get month
      const day = watch("day"); // Get day in number
      const appointments = watch("appointments"); // Get appointments

      // Day is greater than max day month
      if (day >= getMaxDayOfMonth(month)) {
        setValue("day", getMaxDayOfMonth(month));
      }

      // Day is less than to current day
      else if (day < getCurrentDay()) {
        setValue("day", getCurrentDay());
      }

      setValue("month", month); // Update field

      // Define job date
      const jobDate = addZeroToNumber(day) + "/" + getMonthIndex(month);
      setValue("jobDate", jobDate); // Update job date

      // Define first hour
      const firstHour = watch("jobTime") || DEFAULT_FIRST_HOUR;
      const dateTime = `${jobDate}\n${firstHour}`;
      setValue("dateTime", dateTime); // Update field 'dateTime'

      // Update field 'appointments'
      setValue(
        "appointments",
        appointments.map((item) => ({
          ...item,
          jobDate: jobDate,
          dateTime: dateTime,
        }))
      );
    },
    [watch("day"), watch("jobTime"), watch("appointments")]
  );

  // Callback 'change' for update time of One Time
  const onChangeTime = useCallback(
    (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      const timeId = option.value; // Get time id
      const day = watch("day"); // Get day
      const month = watch("month"); // Get month
      const timeOptions = watch("timeOptions"); // Get time options
      const appointments = watch("appointments"); // Get appointments

      // Get time option
      const timeOption = timeOptions.find((item) => item.value === timeId);
      if (typeof timeOption === "undefined") return;

      const label = timeOption.label; // Define label
      const splitHours = label?.split(" - "); // Split hours

      // Define job time
      const jobTime = Array.isArray(splitHours)
        ? splitHours[0]
        : DEFAULT_FIRST_HOUR;

      setValue("jobTime", jobTime); // Update field 'jobTime'
      setValue("timeId", timeOption.value); // Update field 'timeId'

      // Define job date
      const jobDate = addZeroToNumber(day) + "/" + getMonthIndex(month);
      setValue("jobDate", jobDate); // Update job date

      // Define first hour
      const firstHour = watch("jobTime") || DEFAULT_FIRST_HOUR;
      const dateTime = `${jobDate}\n${firstHour}`;
      setValue("dateTime", dateTime); // Update field 'dateTime'

      // Update field 'appointments'
      setValue(
        "appointments",
        appointments.map((item) => ({
          ...item,
          jobTime: jobTime,
          dateTime: dateTime,
        }))
      );
    },
    [
      watch("day"),
      watch("month"),
      watch("jobTime"),
      watch("timeOptions"),
      watch("appointments"),
    ]
  );

  // Callback 'change' for update the day of One Time
  const validateDay = useCallback(
    (e) => {
      const month = watch("month"); // Get month
      const appointments = watch("appointments"); // Get appointments
      const day = Number(e.target.value); // Get day in number

      // Validate current day
      if (month === getCurrentMonth() && day < getCurrentDay()) {
        return setValue("day", getCurrentDay());
      }

      // Validate max day of month
      if (day > getMaxDayOfMonth(month)) {
        return setValue("day", getMaxDayOfMonth(month));
      }

      // Update day
      setValue("day", day);

      // Define job date
      const jobDate = addZeroToNumber(day) + "/" + getMonthIndex(month);
      setValue("jobDate", jobDate); // Update job date

      // Define first hour
      const firstHour = watch("jobTime") || DEFAULT_FIRST_HOUR;
      const dateTime = `${jobDate}\n${firstHour}`;
      setValue("dateTime", `${jobDate}\n${firstHour}`); // Update field 'dateTime'

      // Update field 'appointments'
      setValue(
        "appointments",
        appointments.map((item) => ({
          ...item,
          jobDate: jobDate,
          dateTime: dateTime,
        }))
      );
    },
    [watch("month"), watch("appointments")]
  );

  // Callback for trigger with of the component
  const onTriggerWidth = useCallback(() => {
    if (ref.current === null) return; // Ref is null
    const jobContainer = ref.current; // Get container

    if (!jobContainer.style.width) {
      setValue("minimizeWidth", true);
      jobContainer.style.width = "150px";
    } else {
      jobContainer.style = {};

      const keys = Object.keys(DEFAULT_VALUES);

      for (const key of keys) {
        setValue(key, DEFAULT_VALUES[key]);
      }
    }
  }, []);

  console.log("[WATCH]", watch());

  return {
    ref: ref,
    watch: watch,
    register: register,
    handleOnChange: handleOnChange,
    onTriggerWidth: onTriggerWidth,
    validateDay: validateDay,
    onToggleDay: onToggleDay,
    onChangeTime: onChangeTime,
    onChangeMonth: onChangeMonth,
    onChangeClient: onChangeClient,
    onChangeService: onChangeService,
    onChangeProperty: onChangeProperty,
  };
}

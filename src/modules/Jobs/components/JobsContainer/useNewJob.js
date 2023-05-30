/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useForm } from "react-hook-form";
import { useRef, useCallback, useMemo, useEffect } from "react";

// Utils
import isObject from "../../../../utils/isObject";
import { createTimeOptions } from "../Time/utils";
import addZeroToNumber from "../../../../utils/addZeroToNumber";
import {
  getCurrentDay,
  getMaxDayOfMonth,
} from "../NewJob/Booking/OneTime/utils";
import {
  getCurrentMonth,
  getMonthIndex,
} from "../NewJob/Booking/OneTime/Months/utils";
import getCurrentDate from "../../../../utils/getCurrentDate";
import validateHourRange from "../../../../utils/validateHourRange";
import getMaxMonthInNextDates from "../../../../utils/getMaxMonthInNextDates";
import { getSpecificWeekday } from "../../../../utils/getSpecificWeekday";
import sortDateString from "../../../../utils/sortDateString";

// Constants
import { bookingOptions } from "../NewJob/Booking/options";
import { daysOptions } from "../NewJob/Booking/RecurrentJobs/constants";
import {
  repeatValues,
  DEFAULT_VALUES,
  DEFAULT_FIRST_HOUR,
  DEFAULT_TOTAL_MONTHS,
} from "../NewJob/constants";
import { compareTimeOptions } from "./utils";

/**
 * Hook that implemenets the logic of the NewJob component
 * @returns {object} Object
 */
export default function useNewJob({ reloadSchedule, setReloadSchedule }) {
  const ref = useRef(null);

  // Define form state
  const {
    watch,
    register,
    setValue,
    handleSubmit: handleParentSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  // Validate if the submit button has been disabled
  const isDisabledSubmitButton = useMemo(() => {
    const { timeId, booking, clientId, serviceId, propertyId, appointments } =
      watch();

    return (
      (timeId === "" &&
        booking === "" &&
        clientId === "" &&
        propertyId === "" &&
        serviceId === "") ||
      appointments.length === 0
    );
  }, [watch()]);

  // Define appointment data
  const appointment = useMemo(() => {
    const {
      clientId,
      customerName,
      jobCost,
      jobDate,
      jobTime,
      dateTime,
      propertyId,
      propertyName,
      serviceType,
      jobDurationTime,
    } = watch();

    // Define appointment
    return {
      clientId: clientId,
      customerName: customerName,
      jobCost: jobCost,
      jobDate: jobDate,
      jobTime: jobTime,
      dateTime: dateTime,
      propertyId: propertyId,
      propertyName: propertyName,
      serviceType: serviceType,
      jobDurationTime: jobDurationTime,
    };
  }, [watch()]);

  // Remove appointment by id
  const removeAppointmentById = useCallback(
    (itemId) => {
      const appoinments = watch("appointments");
      if (appoinments.length === 0) return;

      // Update appointments
      setValue(
        "appointments",
        appoinments.filter((item) => item.id !== itemId)
      );
    },
    [watch("appointments")]
  );

  // Set new appointments
  const setAppointments = useCallback((items) => {
    if (!Array.isArray(items)) return;
    if (items.length === 0) return;

    // Update appointments
    setValue("appointments", items);
  }, []);

  // Clear appointments
  const clearAppointments = useCallback(() => {
    const booking = watch("booking"); // Get booking option
    if (booking !== "multiple-days") return; // Clear appointments when 'multiple-days' is active
    setValue("appointments", DEFAULT_VALUES.appointments); // Clear appointments
  }, [watch("booking")]);

  // Callback 'change' for update Select field
  const handleOnChange = useCallback((field) => {
    return (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      setValue(field, option.value); // Update field

      if (field === "repeat") {
        onUpdateRecurrentJobs({ newRepeat: option.value });
      }

      if (field === "forMonthly") {
        onUpdateRecurrentJobs({ newForMonthly: option.value });
      }
    };
  }, []);

  // Update date of Appointments
  const updateDate = useCallback(
    ({ day, month }) => {
      const formData = watch();

      // Define job date
      const jobDate =
        getMonthIndex(month || formData.month) +
        "/" +
        addZeroToNumber(day || formData.day);

      setValue("jobDate", jobDate); // Update job date

      // Define first hour
      const firstHour = watch("jobTime") || DEFAULT_FIRST_HOUR;
      const dateTime = `${jobDate}\n${firstHour}`;
      setValue("dateTime", `${jobDate}\n${firstHour}`); // Update field 'dateTime'

      return {
        jobDate: jobDate,
        dateTime: dateTime,
      };
    },
    [watch()]
  );

  // Update day and month
  const updateDayAndMonth = useCallback(
    ({ day, month }) => {
      if (typeof day !== "number") return; // Stop function
      if (typeof month !== "string") return; // Stop function

      setValue("day", day); // Update day
      setValue("month", month); // Update month
    },
    [watch()]
  );

  // Update jobTime
  const updateJobTime = useCallback(({ timeId, timeOptions }) => {
    // Get time option
    const timeOption = timeOptions.find((item) => item.value === timeId);
    if (typeof timeOption === "undefined") return; // Stop function
    setValue("timeId", timeOption.value); // Update field 'timeId'

    const label = timeOption.label; // Define label
    const splitHours = label?.split(" - "); // Split hours

    // Define job time
    const jobTime = Array.isArray(splitHours)
      ? splitHours[0]
      : DEFAULT_FIRST_HOUR;

    setValue("jobTime", jobTime); // Update field 'jobTime'

    return jobTime;
  }, []);

  // Pick time option
  const pickTimeOption = useCallback(({ jobDate, timeOptions }) => {
    if (!Array.isArray(timeOptions)) return {}; // Stop function

    let jobTime = "";
    let dateTime = "";

    // Get time option
    const timeOption = timeOptions.find((item) =>
      validateHourRange(item.label)
    );

    // Time option not found
    if (typeof timeOption === "undefined") return {};

    // Time option found
    const label = timeOption.label;
    const splitHours = label?.split(" - ");

    jobTime = Array.isArray(splitHours) ? splitHours[0] : DEFAULT_FIRST_HOUR;

    // Define date time
    dateTime = `${jobDate}\n${jobTime}`;

    setValue("jobTime", jobTime); // Update field 'timeId'
    setValue("timeId", timeOption.value); // Update field 'timeId'
    setValue("dateTime", dateTime); // Update field 'dateTime'

    return {
      jobTime: jobTime,
      dateTime: dateTime,
      timeId: timeOption.value,
    };
  }, []);

  // Auto update time options when changes day or month
  const autoUpdateTimeOptions = useCallback(() => {
    const day = watch("day"); // Get day
    const month = watch("month"); // Get month
    const timeOptions = watch("timeOptions"); // Get time options
    const jobDurationTime = watch("jobDurationTime"); // Get jobDurationTime

    if (timeOptions.length === 0) return; // Stop callback
    const monthIndex = getMonthIndex(month); // Get month index

    // Create new time options
    const newTimeOptions = createTimeOptions({
      day: day,
      time: jobDurationTime,
      month: Number(monthIndex),
    });

    // Check if current time options are equal to new time options
    const isChanged = compareTimeOptions(timeOptions, newTimeOptions);
    if (!isChanged) return; // Time options not changed

    // Update time options
    setValue(
      "timeOptions",
      timeOptions.map((item, i) => ({
        ...item,
        disabled: newTimeOptions[i]?.disabled || false,
      }))
    );
  }, [
    watch("day"),
    watch("month"),
    watch("timeOptions"),
    watch("jobDurationTime"),
  ]);

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

      const day = watch("day"); // Get day
      const month = watch("month"); // Get month
      const appointments = watch("appointments"); // Get appointments
      const monthIndex = getMonthIndex(month); // Get month index

      // Define job date
      const jobDate = monthIndex + "/" + addZeroToNumber(day);
      setValue("jobDate", jobDate); // Update job date

      // Define time options
      const timeOptions = createTimeOptions({
        day: day,
        time: jobDurationTime,
        month: Number(monthIndex),
      });

      setValue("timeOptions", timeOptions); // Update field 'timeOptions'

      // Pick time option
      const { jobTime, dateTime } = pickTimeOption({
        jobDate: jobDate,
        timeOptions: timeOptions,
      });

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

      const { day, month, booking, appointments } = watch(); // Get form data

      // Get month index
      const monthIndex = getMonthIndex(month);

      // Define time options
      const timeOptions = createTimeOptions({
        day: day,
        time: jobDurationTime,
        month: Number(monthIndex),
      });

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
    [watch()]
  );

  // Callback 'click' for toggle days
  const onToggleDay = useCallback(
    (dayId) => {
      let newDays = null;
      const days = watch("days"); // Get form data
      const existsDay = days.includes(dayId); // Check if dayId has been included

      // DayId already exists
      if (existsDay) {
        newDays = days.filter((item) => item !== dayId); // Define new days
        setValue("days", newDays); // Update days
      } else {
        newDays = [...days, dayId]; // Define new days
        setValue("days", newDays); // Update days
      }

      onUpdateRecurrentJobs();
    },
    [watch(), appointment]
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

      setValue("month", month); // Update field 'month'

      // Update dates
      const { jobDate, dateTime } = updateDate({ day: day, month: month });

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
      const { day, month, booking, timeOptions, appointments } = watch(); // Get form state

      // Update job time
      const jobTime = updateJobTime({
        timeId: timeId,
        timeOptions: timeOptions,
      });

      // Define job date
      const jobDate = getMonthIndex(month) + "/" + addZeroToNumber(day);

      if (booking === "recurrent-jobs") {
        if (validateHourRange(option.label)) {
          const newAppointments = appointments.slice();

          newAppointments.unshift({
            ...appointment,
            jobTime: jobTime,
            jobDate: jobDate,
            dateTime: `${jobDate}\n${jobTime}`,
          });

          return setValue("appointments", newAppointments);
        }

        // Update field 'appointments'
        setValue(
          "appointments",
          appointments
            .filter((item) => {
              const jobDateSplit = item.jobDate.split("/");
              const { today } = getCurrentDate();

              const newDate = new Date(
                today.getFullYear(),
                jobDateSplit[1],
                jobDateSplit[0]
              );

              const equalDate =
                today.getFullYear() === newDate.getFullYear() &&
                today.getMonth() + 1 === Number(jobDateSplit[1]) &&
                today.getDate() === Number(jobDateSplit[0]);

              if (equalDate) {
                return validateHourRange(`${item.jobTime} - ${item.jobTime}`);
              }

              return true;
            })
            .map((item) => ({
              ...item,
              jobTime: jobTime,
              dateTime: `${item.jobDate}\n${jobTime}`,
            }))
        );
      }

      if (booking === "one-time" || booking === "multiple-days") {
        // Update dates
        const { dateTime } = updateDate({ day: day, month: month });

        if (booking === "one-time") {
          // Update field 'appointments'
          setValue(
            "appointments",
            appointments.map((item) => ({
              ...item,
              jobTime: jobTime,
              dateTime: dateTime,
            }))
          );
        }
      }
    },
    [watch()]
  );

  // Callback for update recurrent jobs
  const onUpdateRecurrentJobs = useCallback(
    (params = {}) => {
      const currentDate = new Date();
      const { newRepeat, newForMonthly } = params;
      const { days, repeat, forMonthly, jobTime, timeId, timeOptions } =
        watch();

      if (days.length === 0) {
        return setValue("appointments", []);
      }

      const newAppointments = []; // Define total appointments for create

      // Get time option
      const timeOption = timeOptions.find((item) => item.value === timeId);

      // Time option not found
      if (typeof timeOption === "undefined") return;

      // Split total months
      const splitTotalMonths =
        typeof newForMonthly === "undefined"
          ? forMonthly.split("-")
          : newForMonthly.split("-");

      // Define total months
      const totalMonths = Array.isArray(splitTotalMonths)
        ? Number(splitTotalMonths[0])
        : DEFAULT_TOTAL_MONTHS;

      for (const day of days) {
        const dayIndex = daysOptions.findIndex((item) => item.id === day); // Get day index
        if (dayIndex === -1) continue;

        let allowed = true;
        const { date } = getSpecificWeekday(dayIndex);

        // Get current date
        let today = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        );

        while (allowed) {
          // Check if its allowed date
          const allowedDate = getMaxMonthInNextDates({
            date: today,
            totalMonths: totalMonths,
          });

          // Its not allowed date
          if (!allowedDate) {
            allowed = false;
            break;
          }

          // Define new job date
          const newJobDate =
            addZeroToNumber(today.getMonth() + 1) +
            "/" +
            addZeroToNumber(today.getDate());

          // Add new appointment
          newAppointments.push({
            jobDate: newJobDate,
            dateTime: `${newJobDate}\n${jobTime}`,
          });

          // Define weeks
          const weeks =
            typeof newRepeat === "undefined"
              ? repeatValues[repeat]
              : repeatValues[newRepeat];

          // Update today
          today.setDate(today.getDate() + weeks);
        }
      }

      // Filter appointments time greater than current date
      const filterItems = newAppointments.filter((item) => {
        const splitDate = item.jobDate.split("/");
        const d = Number(splitDate[1]); // Get day
        const m = Number(splitDate[0]); // Get month

        if (m === currentDate.getMonth() + 1) {
          return d >= currentDate.getDate();
        }

        return true;
      });

      // Sort appointments date by ascendent date
      const sortedAppointments = sortDateString(filterItems);

      // Update appointments
      setValue(
        "appointments",
        sortedAppointments.map((item) => ({
          ...appointment,
          ...item,
        }))
      );
    },
    [watch(), appointment]
  );

  // Callback 'change' for update booking option
  const onChangeBooking = useCallback(
    (option) => {
      if (!("value" in option)) return; // 'Value' field not exists in option
      const newBooking = option.value; // Get booking option

      // Get form data
      const { day, month, jobDate, clientId, booking, jobDurationTime } =
        watch();

      // Get month index
      const monthIndex = getMonthIndex(month);

      // Define time options params
      const timeOptionsParams = {
        day: day,
        time: jobDurationTime,
        month: Number(monthIndex),
      };

      // Previous booking is "recurrent-jobs"
      if (newBooking !== "recurrent-jobs" && booking === "recurrent-jobs") {
        const timeOptions = createTimeOptions(timeOptionsParams); // Define time options
        pickTimeOption({ jobDate: jobDate, timeOptions: timeOptions }); // Pick time option
        setValue("timeOptions", timeOptions); // Update field 'timeOptions'
      }

      setValue("booking", newBooking); // Update booking

      if (clientId === "") return; // Stop callback

      // One time option selected
      if (newBooking === "one-time") {
        setValue("appointments", [appointment]);
      }

      // Recurrent jobs option selected
      if (newBooking === "recurrent-jobs") {
        onUpdateRecurrentJobs();

        // Define time options
        const timeOptions = createTimeOptions(timeOptionsParams).map(
          (item) => ({
            ...item,
            disabled: false,
          })
        );

        pickTimeOption({ jobDate: jobDate, timeOptions: timeOptions }); // Pick time option
        setValue("timeOptions", timeOptions); // Update field 'timeOptions'
      }

      // Multiple days option selected
      if (newBooking === "multiple-days") {
        !reloadSchedule && setReloadSchedule(true);
        setValue("appointments", DEFAULT_VALUES.appointments);
      }
    },
    [watch(), appointment, reloadSchedule]
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

      // Update dates
      const { jobDate, dateTime } = updateDate({ day: day, month: month });

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
    [watch()]
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
      setValue("minimizeWidth", false);
    }
  }, []);

  // Callback 'submit' form
  const onHideModal = useCallback(() => {
    setValue("showCreateJobModal", false);
  }, []);

  // Callback 'submit' form
  const submit = useCallback(() => {
    setValue("showCreateJobModal", true);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      autoUpdateTimeOptions(); // Auto update time options
    }

    return () => {
      mounted = false;
    };
  }, [watch("day"), watch("month")]);

  return {
    ref: ref,
    watch: watch,
    submit: submit,
    register: register,
    updateDate: updateDate,
    updateDayAndMonth: updateDayAndMonth,
    appointment: appointment,
    handleSubmit: handleParentSubmit,
    handleOnChange: handleOnChange,
    onTriggerWidth: onTriggerWidth,
    validateDay: validateDay,
    setAppointments: setAppointments,
    removeAppointmentById: removeAppointmentById,
    onToggleDay: onToggleDay,
    onHideModal: onHideModal,
    onChangeTime: onChangeTime,
    onChangeMonth: onChangeMonth,
    onChangeClient: onChangeClient,
    onChangeService: onChangeService,
    onChangeBooking: onChangeBooking,
    onChangeProperty: onChangeProperty,
    clearAppointments: clearAppointments,
    isDisabledSubmitButton: isDisabledSubmitButton,
  };
}

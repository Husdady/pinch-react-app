/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useForm } from "react-hook-form";
import { useMemo, useCallback, useEffect } from "react";

// Utils
import isObject from "../../../../utils/isObject";
import generateUniqueId from "../../../../utils/generateUniqueId";

// Constants
import { DEFAULT_VALUES } from "./constants";

/**
 * Hook that implemenets the logic of the CalendarModal component
 * @param {object} params Receive a 'schedule' data
 * @returns {object} Object
 */
export default function useCalendarModal({
  timeId,
  timeOptions,
  schedule,
  appointment,
  appointmentsForm,
  updateDate,
  onHideModal,
  onChangeTime,
  setAppointments,
  removeAppointmentById,
}) {
  // Define form state
  const {
    watch,
    setValue,
    handleSubmit: handleChildSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  // Disable 'Save' button
  const disableSubmitBtn = useMemo(() => {
    return watch("newAppointments").length === 0;
  }, [watch("newAppointments")]);

  // Callback 'pick' a day of the Calendar
  const appointments = useMemo(() => {
    const schedule = watch("schedule"); // Get schedule
    const activeDay = watch("activeDay"); // Get activeDay

    if (activeDay === null) return []; // Active day not defined

    // Find item by date
    const item = schedule.find((item) => item.date === activeDay.date);

    // Item not found
    if (typeof item === "undefined") return [];

    return item.appoinments.map((item) => ({
      ...item,
      id: typeof item.id === "undefined" ? generateUniqueId() : item.id,
    }));
  }, [watch("schedule"), watch("activeDay")]);

  // Callback for select default appointment
  const selectDefaultAppointment = useCallback(
    (params = {}) => {
      const activeId = watch("selectedAppointment"); // Get selected appointment
      const copyAppointments = [...appointments]; // Create appointments copy

      // New appointment added
      if (isObject(params.newAppointment)) {
        copyAppointments.push(params.newAppointment);
      }

      // Filter new appointments
      const filterAppointments = copyAppointments.filter((item) => {
        if (typeof params.itemId === "string") {
          return item.id !== params.itemId && item.isNew;
        }
        return item.isNew;
      });

      if (filterAppointments.length === 0) return; // Stop function when are empty items

      const firstItem = filterAppointments[0]; // Get first appointment
      if (typeof firstItem === "undefined") return; // Appointment not exists

      // Same id
      if (activeId === firstItem.id) return;
      setValue("selectedAppointment", firstItem.id); // Update selected appointment
    },
    [appointments, watch("selectedAppointment")]
  );

  // Callback 'hide' modal
  const handleHideModal = useCallback(() => {
    onHideModal(); // Hide modal

    // Check if button not its disabled
    if (!watch("isSaved") && !disableSubmitBtn) {
      const keys = Object.keys(DEFAULT_VALUES); // Get properties of default values

      // Reset values
      for (const key of keys) {
        setValue(key, DEFAULT_VALUES[key]);
      }
    }
  }, [watch("isSaved"), disableSubmitBtn]);

  // Callback 'pick' a day of the Calendar
  const onSelectDay = useCallback(
    (day) => {
      if (day === null) return;
      setValue("activeDay", day); // Update activeDay
      updateDate({ day: day.index, month: day.month }); // Update dates
    },
    [appointments, watch("selectedAppointment")]
  );

  // Callback 'select' appointment
  const onSelectAppointment = useCallback((id) => {
    return () => {
      setValue("selectedAppointment", id);
    };
  }, []);

  // Listener for listen when appointments form has been removed
  const listenAppointmentsFormRemoved = useCallback(() => {
    const currentAppointments = watch("newAppointments");
    const totalCurrent = currentAppointments.length;
    const totalAppointments = appointmentsForm.length;

    // Empty appointments form
    // if (totalAppointments === 0) return;
    console.log("[totalCurrent]", totalCurrent);
    console.log("[totalAppointments]", totalAppointments);
    // Appointments form not removed
    if (totalAppointments >= totalCurrent) return;

    // Get removed items
    const removedItems = currentAppointments.filter(
      (item) => !appointmentsForm.some((el) => el.id === item.id)
    );

    // if (removedItems.length === 0) return;

    // Update new appointments in the Calendar
    setValue("newAppointments", appointmentsForm);

    const schedule = watch("schedule"); // Get activeDay

    const newSchedule = schedule.reduce((acc, item) => {
      const itemAppoinments = item.appoinments.filter((item) =>
        removedItems.some((el) => el.id !== item.id)
      );

      acc.push({
        ...item,
        appoinments: itemAppoinments,
      });

      // return [
      //   ...acc,
      //   {
      //     ...item,
      //     appoinments: itemAppoinments,
      //   },
      // ];
      return acc;
    }, []);

    console.log("[SCHEDULE]", newSchedule);

    // Remove appointments from schedule
    // newSchedule[index].appoinments = removedItems.filter((item) =>
    //   removedItems.some((el) => el.id !== item.id)
    // );

    // Update schedule
    setValue("schedule", newSchedule);
  }, [appointmentsForm]);

  // Callback 'remove' appointment
  const onRemoveAppointment = useCallback(
    (e) => {
      e.stopPropagation();
      const formData = watch(); // Get form data

      const scheduleData = formData.schedule; // Get schedule
      const { isSaved, activeDay, newAppointments, selectedAppointment } =
        formData; // Get schedule

      if (selectedAppointment === "") return;

      // Define new items
      const newItems = newAppointments.filter(
        (item) => item.id !== selectedAppointment
      );

      // Update new appointments
      setValue("newAppointments", newItems);
      selectDefaultAppointment({ itemId: selectedAppointment }); // Select default appointment

      // Find item by date
      const index = scheduleData.findIndex(
        (item) => item.date === activeDay.date
      );

      // Index not found
      if (index === -1) return;

      // Get updated appointments
      const items = scheduleData[index].appoinments;

      // Remove appointment
      scheduleData[index].appoinments = items.filter(
        (item) => item.id !== selectedAppointment
      );

      setValue("schedule", scheduleData); // Update schedule

      if (isSaved && newAppointments.length === 0) {
        setValue("isSaved", false);
      }

      // Remove appointment from job state
      removeAppointmentById(selectedAppointment);
    },
    [watch(), appointments]
  );

  // Callback 'load' the active day in the Calendar
  const onLoadActiveDay = useCallback(
    (day) => {
      if (day === null) return;

      const formData = watch(); // Get form data
      const scheduleData = formData.schedule; // Get schedule
      const { activeDay, timeLabel } = formData; // Destructure form data

      // Same day selected
      if (activeDay !== null && activeDay.id === day.id) return;
      setValue("activeDay", day); // Update activeDay

      // Update schedule
      if (
        scheduleData.length === 0 &&
        Array.isArray(schedule) &&
        schedule.length > 0
      ) {
        setValue("schedule", schedule);
      }

      // Get time option
      const timeOption = timeOptions.find((item) => item.value === timeId);
      if (typeof timeOption === "undefined") return; // Stop function

      if (timeLabel === "" && timeLabel !== timeOption.label) {
        setValue("timeLabel", timeOption.label);
      }
    },
    [watch(), timeId, timeOptions]
  );

  // Callback 'change' in Time Select
  const handleChangeTime = useCallback((option) => {
    onChangeTime(option);

    if (option === null) return;
    setValue("timeLabel", option.label);
  });

  // Callback for add new appointment
  const addNewAppointment = useCallback(() => {
    const formData = watch(); // Get form data

    const scheduleData = formData.schedule; // Get schedule from the form data
    const newSchedule = scheduleData.slice(); // Create copy of the schedule

    // Destructure form data
    const { activeDay, timeLabel, newAppointments } = formData;

    // Find item by date
    const item = newSchedule.find((item) => item.date === activeDay.date);

    // Define appointment id
    const appointmentId = generateUniqueId();

    // Define new appointment structure
    const newAppointment = {
      id: appointmentId,
      isNew: true,
      clientId: appointment.clientId,
      clientName: appointment.customerName,
      jobSchedule: timeLabel,
    };

    // Select default appointment
    selectDefaultAppointment({ newAppointment: newAppointment });

    // Add new schedule
    if (typeof item === "undefined") {
      // Define new appointment structure
      const newScheduleItem = {
        id: generateUniqueId(),
        date: activeDay.date,
        active: true,
        appoinments: [newAppointment],
      };

      newSchedule.unshift(newScheduleItem);
    } else {
      // Get index of schedule day
      const index = newSchedule.findIndex(
        (item) => item.date === activeDay.date
      );

      // Active appointment
      if (newSchedule[index].active === false) {
        newSchedule[index].active = true;
      }

      // Add new appointment
      newSchedule[index].appoinments.push(newAppointment);
    }

    setValue("schedule", newSchedule); // Update schedule

    // Update new appointments
    setValue("newAppointments", [
      ...newAppointments,
      {
        ...appointment,
        id: appointmentId,
        timeLabel: timeLabel,
        jobDate: activeDay.jobDate,
      },
    ]);
  }, [watch(), appointment, appointments]);

  // Callback 'submit' form
  const submit = useCallback((formState) => {
    onHideModal();
    setValue("isSaved", true);

    // Set new appointments to Job state
    setAppointments(formState.newAppointments);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) selectDefaultAppointment();

    return () => {
      mounted = false;
    };
  }, [watch("activeDay")]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      listenAppointmentsFormRemoved();
    }

    return () => {
      mounted = false;
    };
  }, [appointmentsForm]);

  return {
    watch: watch,
    submit: submit,
    handleSubmit: handleChildSubmit,
    appointments: appointments,
    disableSubmitBtn: disableSubmitBtn,
    addNewAppointment: addNewAppointment,
    onSelectDay: onSelectDay,
    onLoadActiveDay: onLoadActiveDay,
    onSelectAppointment: onSelectAppointment,
    onRemoveAppointment: onRemoveAppointment,
    handleHideModal: handleHideModal,
    handleChangeTime: handleChangeTime,
  };
}

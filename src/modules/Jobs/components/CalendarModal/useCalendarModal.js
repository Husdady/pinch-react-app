/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useForm } from "react-hook-form";
import { useMemo, useCallback, useEffect } from "react";

// Utils
// Constants
import { DEFAULT_VALUES } from "./constants";
import generateUniqueId from "../../../../utils/generateUniqueId";

/**
 * Hook that implemenets the logic of the CalendarModal component
 * @param {object} params Receive a 'schedule' data
 * @returns {object} Object
 */
export default function useCalendarModal({
  show,
  timeId,
  timeOptions,
  schedule,
  appointment,
  updateDate,
  onChangeTime,
}) {
  // Define form state
  const { watch, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

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

  // Callback 'pick' a day of the Calendar
  const onSelectDay = useCallback((day) => {
    if (day === null) return;
    setValue("activeDay", day); // Update activeDay
    updateDate({ day: day.index, month: day.month }); // Update dates
  }, []);

  // Callback 'select' appointment
  const onSelectAppointment = useCallback((id) => {
    return () => {
      setValue("selectedAppointment", id);
    };
  }, []);

  // Callback 'remove' appointment
  const onRemoveAppointment = useCallback(() => {
    const formData = watch(); // Get form data

    const scheduleData = formData.schedule; // Get schedule
    const { activeDay, newAppointments, selectedAppointment } = formData; // Get schedule

    if (selectedAppointment === "") return;

    setValue(
      "newAppointments",
      newAppointments.filter((item) => item.id !== selectedAppointment)
    );

    // Find item by date
    const index = scheduleData.findIndex(
      (item) => item.date === activeDay.date
    );
    if (index === -1) return;

    // Get updated appointments
    const updatedAppointments = scheduleData[index].appoinments;

    // Remove appointment
    scheduleData[index].appoinments = updatedAppointments.filter(
      (item) => item.id !== selectedAppointment
    );

    setValue("schedule", scheduleData); // Update schedule
    setValue("selectedAppointment", DEFAULT_VALUES.selectedAppointment);
  }, [watch()]);

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

    const scheduleData = formData.schedule;
    const newSchedule = scheduleData.slice();

    const { activeDay, timeLabel, newAppointments, selectedAppointment } =
      formData;

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

      // Add new appointment
      newSchedule[index].appoinments.push(newAppointment);
    }

    setValue("schedule", newSchedule); // Update schedule

    if (selectedAppointment === "") {
      setValue("selectedAppointment", appointmentId);
    }

    // Update new appointments
    setValue("newAppointments", [
      ...newAppointments,
      { id: appointmentId, ...appointment },
    ]);
  }, [watch(), appointment]);

  // Callback 'submit' form
  const submit = useCallback(() => {
    //
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const newAppointments = watch("newAppointments");

      if (!show && newAppointments.length > 0) {
        const keys = Object.keys(DEFAULT_VALUES);

        for (const key of keys) {
          setValue(key, DEFAULT_VALUES[key]);
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [show, watch("newAppointments")]);

  console.log("[CALENDAR_MODAL]", watch());

  return {
    watch: watch,
    submit: submit,
    handleSubmit: handleSubmit,
    appointments: appointments,
    addNewAppointment: addNewAppointment,
    onSelectDay: onSelectDay,
    onLoadActiveDay: onLoadActiveDay,
    onSelectAppointment: onSelectAppointment,
    onRemoveAppointment: onRemoveAppointment,
    handleChangeTime: handleChangeTime,
  };
}

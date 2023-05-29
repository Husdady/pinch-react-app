/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useState, useCallback } from "react";

// Utils
import { parseAppointments } from "./utils";
import postAppointments from "./postAppointments";

/**
 * Hook for implements the logic in the JobsContainer component
 * @returns {object} Data
 */
export default function useJobs() {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);
  const [reloadSchedule, setReloadSchedule] = useState(true);
  const [reloadAppointments, setReloadAppointments] = useState(true);

  // Event 'close' modal
  const hideAppointmentCreatedModal = useCallback(() => {
    setSuccesfully(false);
  }, []);

  // Event 'submit' in the form for create job
  const createJob = useCallback(
    ({ appointments, onHideModal, clearAppointments }) => {
      return async (formState) => {
        // Parse appointments
        const parsedAppointments = parseAppointments({
          appointments: appointments,
          notifications: formState.notifications,
          confirmation: formState.confirmation,
          confirmationBy: formState.confirmationBy,
        });

        console.log("[ITEMS]", appointments);

        // Make request for create new job
        await postAppointments({
          appointments: [
            {
              serviceType: "Deep Cleaning",
              clientId: "abd4aa68-b44c-4e2b-b1b3-53765055556b",
              jobTime: "9:00 AM",
              customerName: "Geidy  lopez",
              jobDurationTime: 30,
              jobDate: "06/04",
              paymentType: "cash",
              dateTime: "06/04\n9:00 AM",
              propertyId: "084a810e-6cdc-49f9-872b-cea5b94ff0a5",
              confirmationBy: "sms",
              status: "pending",
              jobCost: 130,
              propertyName: "casa lopez",
              notifications: true,
              confirmation: true,
            },
          ],
          onInit: () => {
            setFetching(true);
          },
          onFinally: () => {
            setFetching(false);
          },
          onError: (err) => {
            setError(err);
            setIsError(true);
            setSuccesfully(false);
          },
          onSuccesfully: () => {
            onHideModal();
            setSuccesfully(true);
            clearAppointments();
            setReloadSchedule(true);
            setReloadAppointments(true);
          },
        });
      };
    },
    []
  );

  return {
    error: error,
    isError: isError,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    reloadSchedule: reloadSchedule,
    setReloadSchedule: setReloadSchedule,
    setReloadAppointments: setReloadAppointments,
    hideAppointmentCreatedModal: hideAppointmentCreatedModal,
    reloadAppointments: reloadAppointments,
    createJob: createJob,
  };
}

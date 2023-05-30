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
export default function useJobs({ api }) {
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

        // Make request for create new job
        await postAppointments({
          api: api,
          appointments: parsedAppointments,
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

/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useState, useCallback } from "react";

// Utils
import { parseAppointments } from "./utils";
import postAppointments from "./postAppointments";

/**
 * Hook that get clients from the API
 * @param {onChangeClient} params Params
 * @returns {object} Params
 */
export default function useJobs() {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);
  const [reloadAppointments, setReloadAppointments] = useState(true);

  // Event 'close' modal
  const hideAppointmentCreatedModal = useCallback(() => {
    setSuccesfully(false)
  }, [])

  // Event 'submit' in the form for create job
  const createJob = useCallback(({ appointments, onHideModal }) => {
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
        },
        onFinish: () => {
          onHideModal();
          setSuccesfully(true);
          setReloadAppointments(true);
        },
      });
    };
  }, []);

  return {
    error: error,
    isError: isError,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    setReloadAppointments: setReloadAppointments,
    hideAppointmentCreatedModal: hideAppointmentCreatedModal,
    reloadAppointments: reloadAppointments,
    createJob: createJob,
  };
}

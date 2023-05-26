/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback, useEffect, useState } from "react";

// Utils
import fetchAppointments from "./fetchAppointments";
import { filterAppointmentStatus } from "./constants";

/**
 * Hook for get the appointments from the API
 * @returns {object} Data
 */
export default function useAppointments({
  reloadAppointments,
  setReloadAppointments,
}) {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [backupAppointments, setBackupAppointments] = useState([]);

  const [filterActivated, setFilterActivated] = useState(
    filterAppointmentStatus[0].value
  );

  // Filter appointments by status
  const filterAppointmentsByStatus = useCallback(
    (option) => {
      if (option.value === null) return; // Value not exists

      setFilterActivated(option.value) // Update filter

      // Reset filters
      if (option.value === filterAppointmentStatus[0].value) {
        return setAppointments(backupAppointments);
      }

      // Filter appointments
      const filterAppointments = backupAppointments.filter(
        (appointment) => appointment.status === option.value
      );

      // Update appointments
      setAppointments(filterAppointments);
    },
    [backupAppointments]
  );

  useEffect(() => {
    let mounted = true; // Component mounted

    if (reloadAppointments) {
      fetchAppointments({
        onInit: () => {
          setFetching(true);
        },
        onFinally: () => {
          setFetching(false);
          setReloadAppointments(false);
        },
        onError: (err) => {
          setError(err);
          setIsError(true);
          setSuccesfully(false);
        },
        onFinish: (result) => {
          setSuccesfully(true);

          if (mounted && "data" in result && Array.isArray(result.data)) {
            setAppointments(result.data); // Update Appointments
            setBackupAppointments(result.data); // Update backup Appointments
          }
        },
      });
    }

    return () => {
      mounted = false; // Component unmounted
    };
  }, [reloadAppointments]);

  return {
    error: error,
    isError: isError,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    appointments: appointments,
    backupAppointments: backupAppointments,
    filterActivated: filterActivated,
    filterAppointmentsByStatus: filterAppointmentsByStatus,
  };
}

/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback, useEffect, useState } from "react";

// Utils
import isObject from "../../../../../utils/isObject";
import fetchAppointments from "./requests/fetchAppointments";
import putAppointmentsStatus from "./requests/putAppointmentsStatus";

// COnstants
import { statusOptions, filterAppointmentStatus } from "./constants";

/**
 * Hook for get the appointments from the API
 * @returns {object} Data
 */
export default function useAppointments({
  api,
  clients,
  clientId,
  onChangeClient,
  reloadAppointments,
  setReloadAppointments,
  setReloadSchedule,
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

      setFilterActivated(option.value); // Update filter

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

  // Callback 'rebook' option picked
  const handleRebookOption = useCallback(
    (appointmentClientId) => {
      // Same client of appointment has been selected
      if (clientId === appointmentClientId) return;

      // Check if exists client in Clients data
      const existsClient = clients.some(
        (client) => client.clientId === appointmentClientId
      );

      // Client not exists in Clients
      if (!existsClient) return;

      // Find client by 'clientId'
      const client = clients.find(
        (item) => item.clientId === appointmentClientId
      );

      if (typeof client === "undefined") return; // Client not exists

      // Change current client
      onChangeClient({
        clientId: client.clientId,
        customerName: client.clientName,
      });
    },
    [clients, clientId]
  );

  // Filter appointments by status
  const updateAppointmentStatus = useCallback(
    ({ appointmentClientId, appointmentId, currentStatus }) => {
      return (option) => {
        if (option.value === null) return; // Value not exists

        if (option.value === "rebook") {
          return handleRebookOption(appointmentClientId);
        }

        const status = option.value; // Get status
        const options = statusOptions[status]; // Get options of this status

        // Validate options array
        if (Array.isArray(options)) {
          const firstOption = options[0]; // Get first option

          // Validate first option
          if (isObject(firstOption)) {
            if (firstOption.value === currentStatus) return;
          }
        }

        putAppointmentsStatus({
          api: api,
          status: status,
          appointmentId: appointmentId,
          onInit: () => {
            setFetching(true);
          },
          onFinally: () => {
            setFetching(false);
            setReloadSchedule(true); // Reload schedule
          },
          onError: (err) => {
            setError(err);
            setIsError(true);
            setSuccesfully(false);
          },
          onSuccesfully: () => {
            setSuccesfully(true);

            // Create copy of the appoitments
            const updatedItems = appointments.slice(0);

            // Find appointment index
            const index = updatedItems.findIndex(
              (item) => item._id === appointmentId
            );
            if (index === -1) return; // Stop callback

            updatedItems[index].status = status; // Update status

            setAppointments(updatedItems); // Update appointments
            setBackupAppointments(updatedItems); // Update backup appointments
          },
        });
      };
    },
    [clients, clientId, appointments, backupAppointments]
  );

  useEffect(() => {
    let mounted = true; // Component mounted

    if (reloadAppointments) {
      fetchAppointments({
        api: api,
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
        onSuccesfully: (result) => {
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
    updateAppointmentStatus: updateAppointmentStatus,
  };
}

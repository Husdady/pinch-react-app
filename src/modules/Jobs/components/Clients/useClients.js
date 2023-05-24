/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback, useEffect, useState } from "react";

// Utils
import fetchClients from "./fetchClients";

// Constants
import { MEMBER_ID } from "../../../../assets/data/constants";

/**
 * Hook that get clients from the API
 * @param {onChangeClient} params Params
 * @returns {object} Params
 */
export default function useClients({ onChangeClient }) {
  const [clients, setClients] = useState([]);
  const [options, setOptions] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

  // Callback 'onChange' in Client Select component
  const onChange = useCallback(
    (option) => {
      if (clients.length === 0) return;
      if (typeof option.value === "undefined") return;

      // Get client by id
      const client = clients.find((item) => item.clientId === option.value);
      
      // Client not exists
      if (typeof client === "undefined") return;

      onChangeClient({
        clientId: client.clientId,
        customerName: client.clientName,
      });
    },
    [clients]
  );

  useEffect(() => {
    let mounted = true; // Component mounted

    fetchClients({
      memberId: MEMBER_ID,
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
      onFinish: (result) => {
        setSuccesfully(true);

        if (mounted && "data" in result && Array.isArray(result.data)) {
          // Parse clients
          const apiClients = result.data.map((client) => ({
            value: client.clientId,
            label: client.clientName,
          }));

          setClients(result.data) // Update clients
          setOptions(apiClients); // Update options
        }
      },
    });

    return () => {
      mounted = false; // Component unmounted
    };
  }, []);

  return {
    error: error,
    options: options,
    clients: clients,
    isFetching: isFetching,
    isError: isError,
    isSuccesfully: isSuccesfully,
    onChange: onChange,
  };
}

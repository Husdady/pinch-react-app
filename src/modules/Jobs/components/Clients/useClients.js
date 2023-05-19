// Hooks
import { useEffect, useState } from "react";

// Utils
import fetchClients from "./fetchClients";

// Constants
import { MEMBER_ID } from "./constants";

export default function useClients() {
  const [clients, setClients] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

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

        if (mounted && 'data' in result && Array.isArray(result.data)) {
          // Parse clients
          const apiClients = result.data.map((client) => ({
            value: client.clientId,
            label: client.clientName
          }));

          setClients(apiClients); // Update clients
        }
      },
    });

    return () => {
      mounted = false; // Component unmounted
    };
  }, []);

  return {
    error: error,
    clients: clients,
    isFetching: isFetching,
    isError: isError,
    isSuccesfully: isSuccesfully,
  };
}

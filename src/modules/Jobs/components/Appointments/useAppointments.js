// Hooks
import { useEffect, useState } from "react";

// Utils
import fetchAppointments from "./fetchAppointments";

// Constants
import { MEMBER_ID } from "./constants";

export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

  useEffect(() => {
    let mounted = true; // Component mounted

    fetchAppointments({
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
          setAppointments(result.data); // Update Appointments
        }
      },
    });

    return () => {
      mounted = false; // Component unmounted
    };
  }, []);

  return {
    error: error,
    appointments: appointments,
    isFetching: isFetching,
    isError: isError,
    isSuccesfully: isSuccesfully,
  };
}

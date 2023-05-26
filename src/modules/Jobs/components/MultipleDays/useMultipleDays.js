// Hooks
import { useState, useCallback, useEffect } from "react";

// Utils
import fetchCalendar from "./fetchCalendar";

/**
 * Hook for implements the logic of the MultipleDays component
 */
export default function useMultipleDays() {
  const [show, setShow] = useState(false); // Hook for show/hide modal
  const [schedule, setSchedule] = useState([]); // Define schedule
  const [isFetching, setFetching] = useState(false); // Bool fetching
  const [error, setError] = useState(null); // Handling error
  const [isError, setIsError] = useState(false); // Exists error
  const [isSuccesfully, setSuccesfully] = useState(false); // Request succesfully

  // Callback for show modal
  const showModal = useCallback(() => setShow(true), []);

  // Callback for hide modal
  const hideModal = useCallback(() => setShow(false), []);

  useEffect(() => {
    let mounted = true; // Component mounted

    fetchCalendar({
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
      onFinish: (result) => {
        setSuccesfully(true);

        if (mounted && "data" in result && Array.isArray(result.data)) {
          setSchedule(result.data); // Update calendar data
        }
      },
    });

    return () => {
      mounted = false; // Component unmounted
    };
  }, []);

  return {
    show: show && !isFetching,
    showModal: showModal,
    hideModal: hideModal,
    error: error,
    isError: isError,
    schedule: schedule,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
  };
}

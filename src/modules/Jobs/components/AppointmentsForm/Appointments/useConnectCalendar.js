/* eslint-disable react-hooks/exhaustive-deps */
// Hooks
import { useCallback, useEffect, useState } from "react";

// Utils
import isObject from "../../../../../utils/isObject";
import fetchConnectCalendar from "./requests/fetchConnectCalendar";
import postConnectCalendar from "./requests/postConnectCalendar";
import postDisconnectCalendar from "./requests/postDisconnectCalendar";

/**
 * Hook for connect with the Google Calendar
 * @returns {object} Data
 */
export default function useConnectCalendar({ api }) {
  const [connected, setConnected] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisonnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccesfully, setSuccesfully] = useState(false);

  const [showingConnectCalendarModal, setShowingConnectCalendarModal] =
    useState(false);

  const [showingDisconnectCalendarModal, setShowingDisconnectCalendarModal] =
    useState(false);

  // Callback for show ConnectCalendar modal
  const showConnectionCalendarModal = useCallback(() => {
    if (connected) return setShowingDisconnectCalendarModal(true);
    return setShowingConnectCalendarModal(true);
  }, [connected]);

  // Callback for hide ConnectCalendar modal
  const hideConnectCalendarModal = useCallback(() => {
    setShowingConnectCalendarModal(false);
  }, []);

  // Callback for hide ConnectCalendar modal
  const hideDisconnectCalendarModal = useCallback(() => {
    setShowingDisconnectCalendarModal(false);
  }, []);

  // Callback for connect to Google Calendar
  const connectToGoogleCalendar = useCallback(async () => {
    await postConnectCalendar({
      api: api,
      onInit: () => {
        setConnecting(true);
      },
      onFinally: () => {
        setConnecting(false);
      },
      onError: (err) => {
        setError(err);
        setIsError(true);
      },
      onSuccesfully: () => {
        setConnected(true);
        hideConnectCalendarModal();
      },
    });
  }, []);

  // Callback for disconnect from Google Calendar
  const disconnectToGoogleCalendar = useCallback(async () => {
    await postDisconnectCalendar({
      api: api,
      onInit: () => {
        setDisonnecting(true);
      },
      onFinally: () => {
        setDisonnecting(false);
      },
      onError: (err) => {
        setError(err);
        setIsError(true);
      },
      onSuccesfully: () => {
        setConnected(false);
        hideDisconnectCalendarModal();
      },
    });
  }, []);

  useEffect(() => {
    let mounted = true; // Component mounted

    fetchConnectCalendar({
      api: api,
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
      onSuccesfully: (result) => {
        if (mounted && isObject(result)) {
          setSuccesfully(true);
          setConnected(result.status);
        }
      },
    });

    return () => {
      mounted = false; // Component unmounted
    };
  }, []);

  return {
    error: error,
    connected: connected,
    connecting: connecting,
    disconnecting: disconnecting,
    isError: isError,
    isFetching: isFetching,
    isSuccesfully: isSuccesfully,
    connectToGoogleCalendar: connectToGoogleCalendar,
    disconnectToGoogleCalendar: disconnectToGoogleCalendar,
    showConnectionCalendarModal: showConnectionCalendarModal,
    hideConnectCalendarModal: hideConnectCalendarModal,
    hideDisconnectCalendarModal: hideDisconnectCalendarModal,
    showingConnectCalendarModal: showingConnectCalendarModal,
    showingDisconnectCalendarModal: showingDisconnectCalendarModal,
  };
}

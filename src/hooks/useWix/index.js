/* eslint-disable react-hooks/exhaustive-deps */
// Librarys
import { useState, useEffect, useCallback } from "react";

// Services
import ApiProfile from "../../services/ApiProfile";

// Utils
import isObject from "../../utils/isObject";

// Constants
import { DEFAULT_WIX_RESPONSE, SEND_DATA_TO_WIX } from "./constants";
import { TOKEN, DEV_URL, CALLER_ID, WIX_APP_URL } from "../../assets/data/api";

// Define default API profile instance
export const defaultApiProfileInstance = new ApiProfile(TOKEN);

/**
 * Hook that obtains the wix response: 'token', 'callerId', 'userName', 'userAvatar' and
 * create a instance of the class ApiProfile for manage the requests to the API
 * @returns {object} Object
 */
export default function useWix() {
  const [wixResponse, setWixResponse] = useState({});
  const [apiProfile, setApiProfile] = useState(defaultApiProfileInstance);

  // Callback for validate Wix response
  const validateWixResponse = useCallback((ev) => {
    if (!isObject(ev.data)) return; // Stop function

    // Update default wix response
    if (
      typeof ev.data === "undefined" ||
      (isObject(ev.data) && "data" in ev.data)
    ) {
      return setWixResponse(DEFAULT_WIX_RESPONSE);
    }

    if (!ev.data.callerId) return; // Validate callerId
    if (ev.data.callerId !== CALLER_ID) return; // Validate wix callerId to current caller id

    if (!ev.data.userName) return; // Validate userName
    if (!ev.data.userAvatar) return; // Validate userAvatar

    setWixResponse(ev.data); // Save Wix response

    // Create API instance
    const newApiInstance = new ApiProfile(ev.data.token);

    // Save api instance
    setApiProfile(newApiInstance);
  }, []);

  // This hook is listening an event that came from the Iframe
  useEffect(() => {
    // Make post message to Wix application when the origin its not equal to localhost:3000
    // if (window.location.origin !== DEV_URL) {
    //   window.parent.postMessage(SEND_DATA_TO_WIX, WIX_APP_URL);
    // }

    window.addEventListener("message", validateWixResponse);

    // Don't forget to remove addEventListener
    return () => window.removeEventListener("message", validateWixResponse);
  }, []);

  return {
    apiProfile: apiProfile,
    wixResponse: wixResponse,
  };
}

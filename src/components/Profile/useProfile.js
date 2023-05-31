/* eslint-disable react-hooks/exhaustive-deps */
// Librarys
import React from "react";
import axios from "axios";

// Services
// import ApiProfile from "../../services/ApiProfile";

// Utils
import isObject from "../../utils/isObject";

// Constants
// import { SEND_DATA_TO_WIX } from "../../hooks/useWix/constants";
import { TOKEN, CALLER_ID } from "../../assets/data/api";

// const apiProfile = new ApiProfile(TOKEN);

/**
 * Hook that implemenents the requests of the Profile component
 * @returns {object} Object
 */
export default function useProfile() {
  const [message, setMessage] = React.useState("");
  const [profile, setProfile] = React.useState([]);

  // // Callback for get profiles
  // const getProfiles = React.useCallback(async () => {
  //   console.log('[PROFILES]')
  //   const data = await apiProfile.get({ url: "/pinchCorsTest" });

  //   // Cors response not exists in data
  //   if (!("corsResponse" in data)) return;

  //   console.log("[Getting Profile.....]", data);
  //   setProfile(data);
  // }, []);

  // Callback for get profiles
  const getProfiles = React.useCallback(async () => {
    try {
      console.log("[PROFILES]");
      const data = await axios.get(
        "https://dev6345.editorx.io/react-test/_functions/pinchCorsTest",
        {
          // origin: window.location.origin,
          headers: {
            "pro-pinch-api-key": TOKEN,
          },
        }
      );

      // Cors response not exists in data
      // if (!("corsResponse" in data)) return;

      console.log("[Getting Profile.....]", data);
      setProfile(data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  }, []);

  React.useEffect(() => {
    console.log("[GET_PROFILES]");
    let mounted = true;

    if (mounted) getProfiles();

    return () => {
      mounted = false;
    };
  }, []);

  // This hook is listening an event that came from the Iframe
  React.useEffect(() => {
    console.log("[handler]");

    const handler = (ev) => {
      console.log("[handler.event]", ev);
      if (!isObject(ev.data)) return;
      if (!ev.data.callerId) return;
      if (ev.data.callerId !== CALLER_ID) if (!ev.data.userId) return;
      if (!ev.data.userName) return;
      if (!ev.data.userAvatar) return;
      console.log("[VALIDATION-OK]");
      setMessage(ev.data);
    };

    // Make post message to Wix application when the origin its not equal to localhost:3000
    // if (window.location.origin !== DEV_URL) {
    //   window.parent.postMessage(SEND_DATA_TO_WIX, WIX_APP_URL);
    // }

    window.addEventListener("message", handler);

    // Don't forget to remove addEventListener
    return () => window.removeEventListener("message", handler);
  }, []);

  return {
    message: message,
    profile: profile,
  };
}

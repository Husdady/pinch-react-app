// Services
import ApiProfile from "../../../../../../services/ApiProfile";

// Constants
import { API_KEY } from "../../../../../../assets/data/api";

const apiProfile = new ApiProfile(API_KEY);

/**
 * Post to '/calendar' for connect to the calendar
 * @param {object} params Receive callbacks
 * @returns {object} Object
 */
export default async function postConnectCalendar({
  onInit,
  onSuccesfully,
  onError,
  onFinally,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback

    // Post to '/calendar' for connect to the Google Calendar
    const result = await apiProfile.post({
      url: "/calendar",
      body: {
        status: true,
        calendarType: "google",
      },
    });

    if (typeof onSuccesfully === "function") onSuccesfully(result); // Execute 'onSuccesfully' callback
    return result;
  } catch (error) {
    if (typeof onError === "function") onError(error); // Execute 'onError' callback
    return { error: error };
  } finally {
    if (typeof onFinally === "function") onFinally(); // Execute 'onFinally' callback
  }
}

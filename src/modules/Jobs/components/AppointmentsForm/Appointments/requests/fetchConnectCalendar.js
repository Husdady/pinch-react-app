// Services
import ApiProfile from "../../../../../../services/ApiProfile";

// Constants
import { API_KEY } from "../../../../../../assets/data/api";

const apiProfile = new ApiProfile(API_KEY);

/**
 * Fetch google calendar for connect from the API
 * @param {object} params Receive callbacks
 * @returns {object} Object
 */
export default async function fetchConnectCalendar({
  onInit,
  onSuccesfully,
  onError,
  onFinally,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback
    const result = await apiProfile.get({ url: "/calendar" });
    if (typeof onSuccesfully === "function") onSuccesfully(result); // Execute 'onSuccesfully' callback
    return result;
  } catch (error) {
    if (typeof onError === "function") onError(error); // Execute 'onError' callback
    return { error: error };
  } finally {
    if (typeof onFinally === "function") onFinally(); // Execute 'onFinally' callback
  }
}

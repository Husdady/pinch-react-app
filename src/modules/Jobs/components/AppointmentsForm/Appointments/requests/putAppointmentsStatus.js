// Services
import ApiProfile from "../../../../../../services/ApiProfile";

// Constants
import { API_KEY } from "../../../../../../assets/data/api";

const apiProfile = new ApiProfile(API_KEY);

/**
 * Put to '/appointments' for update appointment status
 * @param {object} params Receive callbacks
 * @returns {object} Object
 */
export default async function putAppointmentsStatus({
  onInit,
  onSuccesfully,
  onError,
  onFinally,
  appointmentId,
  status,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback

    // Post to '/appointments' for update appointment status
    const result = await apiProfile.put({
      url: "/appointments",
      body: {
        appointmentId: appointmentId,
        status: status,
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

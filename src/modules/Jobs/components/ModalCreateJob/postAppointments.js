// Services
import ApiProfile from "../../../../services/ApiProfile";

// Constants
import { API_KEY } from "../../../../assets/data/api";

const apiProfile = new ApiProfile(API_KEY);

/**
 * Post request fori add new appointments
 * @param {object} params Receive a 'memberId' and callbacks
 * @returns {object} Object
 */
export default async function postAppointments({
  onInit,
  onFinish,
  onError,
  onFinally,
  appointments,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback

    // console.log(JSON.stringify({
    //   appointments: appointments,
    // }))
    console.log('[appointments]', appointments)

    const result = await apiProfile.post({
      url: `/appointments`,
      body: { appointments: appointments }
    });

    if (typeof onFinish === "function") onFinish(result); // Execute 'onFinish' callback

    return result;
  } catch (error) {
    if (typeof onError === "function") onError(error); // Execute 'onError' callback
    return { error: error };
  } finally {
    if (typeof onFinally === "function") onFinally(); // Execute 'onFinally' callback
  }
}

/**
 * Fetch google calendar for connect from the API
 * @param {object} params Receive callbacks
 * @returns {object} Object
 */
export default async function fetchConnectCalendar({
  api,
  onInit,
  onError,
  onFinally,
  onSuccesfully,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback
    const result = await api.get({ url: "/calendar" });
    if (typeof onSuccesfully === "function") onSuccesfully(result); // Execute 'onSuccesfully' callback
    return result;
  } catch (error) {
    if (typeof onError === "function") onError(error); // Execute 'onError' callback
    return { error: error };
  } finally {
    if (typeof onFinally === "function") onFinally(); // Execute 'onFinally' callback
  }
}

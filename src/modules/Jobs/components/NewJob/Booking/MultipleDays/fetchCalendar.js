/**
 * Fetch calendar from the API
 * @param {object} params Receive a 'memberId' and callbacks
 * @returns {object} Object
 */
export default async function fetchCalendar({
  api,
  onInit,
  onSuccesfully,
  onError,
  onFinally,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback
    const result = await api.get({ url: "/schedule" });
    if (typeof onSuccesfully === "function") onSuccesfully(result); // Execute 'onSuccesfully' callback
    return result;
  } catch (error) {
    if (typeof onError === "function") onError(error); // Execute 'onError' callback
    return { error: error };
  } finally {
    if (typeof onFinally === "function") onFinally(); // Execute 'onFinally' callback
  }
}

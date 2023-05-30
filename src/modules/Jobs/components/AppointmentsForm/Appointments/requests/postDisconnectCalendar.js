/**
 * Post to '/calendar' for disconnect to the calendar
 * @param {object} params Receive callbacks
 * @returns {object} Object
 */
export default async function postDisconnectCalendar({
  api,
  onInit,
  onError,
  onFinally,
  onSuccesfully,
}) {
  try {
    if (typeof onInit === "function") onInit(); // Execute 'onInit' callback

    // Post to '/calendar' for disconnect to the Google Calendar
    const result = await api.post({
      url: "/calendar",
      body: {
        status: false,
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
